const TABELA = 'entregas';

export class EntregasRepository {
  constructor(database) {
    this.database = database;
  }

  listarTodas() {
    return this.database.listar(TABELA);
  }

  buscarPorId(id) {
    return this.database.porId(TABELA, id);
  }

  buscarPorChave(descricao, origem, destino) {
    return this.database.listar(TABELA).filter((entrega) =>
      entrega.descricao === descricao &&
      entrega.origem === origem &&
      entrega.destino === destino
    );
  }

  criar(dados) {
    return this.database.adicionar(TABELA, dados);
  }

  atualizar(id, dados) {
    return this.database.alterar(TABELA, id, dados);
  }
}
