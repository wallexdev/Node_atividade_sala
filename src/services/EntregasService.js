import { RegraNegocioError } from '../utils/RegraNegocioError.js';

const proximoStatus = {
  CRIADA: 'EM_TRANSITO',
  EM_TRANSITO: 'ENTREGUE',
};

function dataAgora() {
  return new Date().toISOString();
}

export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  listar(status) {
    const entregas = this.repository.listarTodas();

    if (!status) return entregas;
    return entregas.filter((entrega) => entrega.status === status);
  }

  buscar(id) {
    const entrega = this.repository.buscarPorId(id);

    if (!entrega) {
      throw new RegraNegocioError(404, 'entrega não encontrada');
    }

    return entrega;
  }

  historico(id) {
    return this.buscar(id).historico;
  }

  criar({ descricao, origem, destino }) {
    if (!descricao || !origem || !destino) {
      throw new RegraNegocioError(
        400,
        'descricao, origem e destino são obrigatórios'
      );
    }

    if (origem === destino) {
      throw new RegraNegocioError(400, 'origem e destino não podem ser iguais');
    }

    const parecida = this.repository.buscarPorChave(descricao, origem, destino);

    const existeAtiva = parecida.some((item) =>
      item.status !== 'ENTREGUE' && item.status !== 'CANCELADA'
    );

    if (existeAtiva) {
      throw new RegraNegocioError(
        409,
        'já existe uma entrega ativa com a mesma descrição, origem e destino'
      );
    }

    return this.repository.criar({
      descricao,
      origem,
      destino,
      status: 'CRIADA',
      motoristaId: null,
      historico: [
        {
          data: dataAgora(),
          descricao: 'Entrega criada',
        },
      ],
    });
  }

  avancar(id) {
    const entrega = this.buscar(id);
    const novoStatus = proximoStatus[entrega.status];

    if (!novoStatus) {
      throw new RegraNegocioError(
        422,
        `não é possível avançar uma entrega com status ${entrega.status}`
      );
    }

    const historico = [...entrega.historico, {
      data: dataAgora(),
      descricao: `Status alterado para ${novoStatus}`,
    }];

    return this.repository.atualizar(id, {
      status: novoStatus,
      historico,
    });
  }

  cancelar(id) {
    const entrega = this.buscar(id);

    if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
      throw new RegraNegocioError(
        422,
        `não é possível cancelar uma entrega ${entrega.status}`
      );
    }

    const historico = [...entrega.historico, {
      data: dataAgora(),
      descricao: 'Entrega cancelada',
    }];

    return this.repository.atualizar(id, {
      status: 'CANCELADA',
      historico,
    });
  }
}
