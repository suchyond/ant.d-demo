export interface CovidData {
    data: {
        /**
         * e.g. "2023-12-14"
         */
        date: string;
        newCases: number;
        newDeaths: number;
    },
    length: number;
    maxPageLimit: number;
    pagination: {
        current: string;
        first: string;
        last: string;
        next: string;
        previous: string;
    },
    // TODO: requestPayload
    totalRecords: number;

}