export class Constants {
  public static URL_MS_1 = 'http://localhost:4000/api/';
  public static URL_MS_2 = 'http://localhost:8020/api/';

  public static MESSAGES = {
    CHECKOUT_PAYMENT: {
      SUCCESS: {
        STATUS: 'success',
        TITLE: 'Compró con éxito en Bodega Store! 😊🎉',
        SUB_TITLE: 'Número de pedido: :code.'
      },
      ERROR: {
        STATUS: 'error',
        TITLE: 'Error al procesar el pago!',
        SUB_TITLE: 'No se hizo ningun recargo a la tarjeta',
      }
    }
  }
}
