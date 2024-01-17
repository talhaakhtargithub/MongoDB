//Using Reference normalization -> CONSISTENCY
let author = {
    name: 'Talha'
}


let course = {
    author: 'id',
    authors: [
        'id1 ', 'id2'
    ]
}


//Using Embedded  (Denormalization) -> Performance
course = {

    author: {
        name:'Talha'
    }

}


//Hybrid



author ={
    name:'Mosh'
    //50 other
}

course={
    author:{
        id:'ref',
        name:'Mosh'
    }
}
