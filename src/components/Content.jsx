function Content({name,marks,course}){
    let grade;
    if(marks>=90){
        grade="A";
    }
    else if(marks>=80){
        grade="B";
    }
    else if(marks>=70){
        grade="C";
    }
    else{
        grade="D";
    }
    return(
        <div className="content">
        <h2>enter the details of your resume</h2>
        <p>Please provide the following information about your resume:</p>
        <p>Name: {name}</p>
        <p>Marks: {marks}</p>
        <p>Course: {course}</p>
        <p>Grade: {grade}</p>
        </div>
    );
}
export default Content;
