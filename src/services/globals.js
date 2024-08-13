// Для того чтобы не показывать лодер 2 раза (сначала онбординг потом лоадер в списке)
// При первой закгрузке мы уже получит первую порцию акицый в онобрдинге
// Поэтому при первой загрузке сразу показываем список акций
export let FIRST_INIT = true
export const setFirstInit = () => FIRST_INIT= false

// Начальная старница для загрузки
export let FIRST_PAGE = 'CouponScreen';
export const setFirstPage = (page) => FIRST_PAGE = page

export let PUSH_ACCESS = 'denied'
export const setPushAccess = (access) => PUSH_ACCESS = access
