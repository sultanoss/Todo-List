export class Todo {

    title: string;
    discription: string;
    date:number;
    found:boolean;
    alarm1:boolean;
    alarm:number;
    alarmActive:boolean;
    list:string;
    customIdName:string;
    author:string;

    constructor(obj?: any) {

        this.title = obj ? obj.title : '';
        this.discription = obj ? obj.discription : '';
        this.date = obj ? obj.date : '';
        this.found = obj ? obj.found:false;
        this.alarm1 = obj ? obj.alarm1:false;
        this.alarm = obj ? obj.alarm:false;
        this.alarmActive = obj ? obj.alarmActive:false;
        this.list = obj? obj.list:'todo';
        this.customIdName = obj? obj.customIdName:'';
        this.author = obj? obj.author:'';
    }

    public toJson() {
        return {
            title: this.title,
            discription: this.discription,
            date:this.date,
            found:this.found,
            alarm1:this.alarm1,
            alarm:this.alarm,
            alarmActive:this.alarmActive,
            list:this.list,
            author:this.author
        }
    }
}