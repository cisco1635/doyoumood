export class Report {
    nbVote : number;
    moyenne : string;
    repart : ReportRepart;
    trend : Array<number>;
}

export class ReportRepart {
    overjoyed : number;
    happy : number;
    neutral : number;
    annoyed : number;
    angry : number;
}
