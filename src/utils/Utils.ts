/**
 * Utils functions
 */
export class Utils {
    /**
     * Filter records to be sent to SQS
     * @param records
     */
    public static filterCertificateGenerationRecords(records: any[]) {
        return records
            .filter((record: any) => { // Filter by testStatus
                console.log("TEST STATUS", record.testStatus);
                return record.testStatus === "submitted";
            })
            .filter((record: any) => { // Filter by testResult (abandoned tests are not allowed)
                console.log("TEST RESULT", record.testTypes.testResult);
                return (record.testTypes.testResult === "pass" || record.testTypes.testResult === "fail" || record.testTypes.testResult === "prs");
            })
            .filter((record: any) => { // Filter by testTypeClassification
                if (record.testTypes && record.testTypes.testTypeClassification) {
                    console.log("TEST TYPE CLASSIFICATION", record.testTypes.testTypeClassification);
                    return record.testTypes.testTypeClassification === "Annual With Certificate";
                }

                return false;
            });
    }
}
