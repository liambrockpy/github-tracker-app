import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const calcTimeToNow = (dateISO) => {
	return dayjs(dateISO).toNow()
}

export const getDateStr = (dateISO) => {
	return dayjs(dateISO).format("D MMM YYYY")
}
