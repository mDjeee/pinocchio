export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'new':
      return {
        className: 'bg-blue-100 text-blue-800',
        label: 'Новый'
      }
    case 'in_bank':
      return {
        className: 'bg-purple-100 text-purple-800',
        label: 'В банке'
      }
    case 'partly_played':
      return {
        className: 'bg-yellow-100 text-yellow-800',
        label: 'Частично разыгран'
      }
    case 'payed':
      return {
        className: 'bg-green-100 text-green-800',
        label: 'Оплачен'
      }
    case 'canceled':
      return {
        className: 'bg-red-100 text-red-800',
        label: 'Отменён'
      }
    default:
      return {
        className: 'bg-gray-100 text-gray-800',
        label: 'Неизвестный статус'
      }
  }
}
