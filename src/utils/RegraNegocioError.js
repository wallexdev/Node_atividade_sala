export class RegraNegocioError extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.status = status;
  }
}
