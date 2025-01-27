import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/fr"
import "dayjs/locale/en"

dayjs.extend(localizedFormat)

dayjs.locale("fr")

export default dayjs
