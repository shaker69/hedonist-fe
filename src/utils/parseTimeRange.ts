import dayjs from "dayjs";

export const parseTimeRange = (rangeString: string) => rangeString.split(';').map(timeString => dayjs(timeString));
