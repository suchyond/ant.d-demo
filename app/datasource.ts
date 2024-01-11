import axios from "axios";
import { CovidData } from "./model/CovidData";

// Could be used for testing, e.g. in Storybook or something
export interface Datasource<T> {
    getData(): Promise<T>;
}

const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=nation;areaName=england&' +
    'structure={"date":"date","newCases":"newCasesByPublishDate",' +
    '"cumAdmissions":"cumAdmissions"}'
);


export class CovidDatasource implements Datasource<CovidData> {
    /**
     * 
     * @throws Error(statusText)
     
     */
    getData = async () => {

        const { data, status, statusText } = await axios.get(endpoint, { timeout: 10000 });
    
        if ( status >= 400 ) {
            throw new Error(statusText);
        }
    
        return data as CovidData;
    };
}