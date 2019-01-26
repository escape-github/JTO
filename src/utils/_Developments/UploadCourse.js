import json from './courses.json';
import { CourseDB } from '../Database.js';

export default function upload(){
    var id = 0;
    var data = [];
    
    json["2018_Fall"].forEach(course=>{
        var parsed = {
            id,
            department: course["개설학과"],
            category: course["과목구분"],
            title: course["과목명"],
            code: course["과목번호"],
            credit: course["강:실:학"]["학점"]
        };

        for(var i = 0; i<data.length; i++){
            var c = data[i];
            const {department, category, title, code, credit} = parsed;
            if(c.department === department && c.category === category && c.title === title && c.code === code && c.credit === credit){
                parsed = null;
                break;
            }
        }

        if(parsed){
            data.push(parsed);
            id+=1;
        }
    });

    data.forEach(course => {
        CourseDB.get("data").get(course.id).putJSON(course);
        if(!course)
            console.log(course.id, course);
    })
    CourseDB.get("max_assigned_id").putJSON(id-1);
}