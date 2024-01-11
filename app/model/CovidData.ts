export interface CovidData {
    data: Array<{
        /**
         * YYYY-MM-DD format
         * e.g. "2023-12-14"
         */
        date: string;
        newCases: number;
        cumAdmissions: number;
    }>,
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