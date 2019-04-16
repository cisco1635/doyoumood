export class Report {
    nbVote : number;
    moyenne : string;
    repart : ReportRepart;
    trend : Array<number>;
    comments : Array<string>;
}

export class ReportRepart {
    overjoyed : number;
    happy : number;
    neutral : number;
    annoyed : number;
    angry : number;
}
