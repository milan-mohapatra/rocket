const jobValidation = {
    title: {
        notEmpty: {
            errorMessage: "valid title required"
        }
    },
    description: {
        notEmpty: {
            errorMessage: "valid description required"
        }
    },
    skills: {
        custom: {
            options: (skills) => {
                if(!Array.isArray(skills)){
                    throw new Error("skills need to be an array") 
                }

                if(!skills.length) {
                    throw new Error("minimum one skill required")
                }

                if(!skills.every((skill) => typeof skill == "string")) {
                    throw new Error("skill is string type")
                }

                return true
            }
        }
    },
    location: {
        notEmpty: {
            errorMessage: "valid location required"
        }
    },
    salary: {
        custom: {
            options: (salary) => {
                if(!(typeof salary === 'object')) {
                    throw new Error("salary is object containing min and max property")
                }

                return true
            }
        }
    },
    "salary.min": {
        isNumeric: {
            errorMessage: "min should be numeric"
        }
    },
    "salary.max": {
        isNumeric: {
            errorMessage: "max should be numeric"
        },
        custom: {
            options: (max, {req}) => {
                if(!(Number(max) > Number(req.body.salary.min))) {
                    throw new Error("max salary should be greater then min salary")
                }
                return true
            }
        }
    },
    recruiterId: {
        isMongoId: {
            errorMessage: "valid mongo Id required"
        }
    },
    deadline: {
        isDate: {
            errorMessage: "valid dater required"
        },
        custom: {
            options: (deadline) => {
                if(new Date(deadline) < new Date()) {
                    throw new Error("deadline should be greater then today")
                }

                return true
            }
        }
    }
}

export default jobValidation
//     title: {
//         notEmpty: {
//             errorMessage: 'title is required'
//         }
//     },
//     description: {
//         notEmpty: {
//             errorMessage: 'description is required'
//         }
//     },
//     skills: {
//         custom: {
//             options: function(value){
//                 if(!Array.isArray(value)) {
//                     throw new Error('skills should be array')
//                 }
//                 if(value.length == 0) {
//                     throw new Error('must contain atleast one skill')
//                 }
//                 if(value.every(ele => typeof ele != 'string')) {
//                     throw new Error('skill should be a string')
//                 }
//                 return true 
//             }
//         }
//     }, 
//     location: {
//         notEmpty: {
//             errorMessage: 'Location is required'
//         }
//     }, 
//     salary : {
//         custom: {
//             options: function(value){
//                 if(typeof value != 'object') {
//                     throw new Error('salary should be an object')
//                 }
//                 if(Object.keys(value).length != 2) {
//                     throw new Error('salary should have 2 fields')
//                 }
//                 if(typeof value.min != 'number') {
//                     throw new Error('min salary should be a number')
//                 }
//                 if(value.min <= 0) {
//                     throw new Error("min salary should be greater than 0")
//                 }
//                 if(typeof value.max != 'number') {
//                     throw new Error('max salary should be a number')
//                 }
//                 if(value.max < value.min) {
//                     throw new Error("max salary should be greater than min salary")
//                 }
//                 return true 
//             }
//         }
//     },
//     // 'salary.min' : {
//     //     notEmpty: {
//     //         errorMessage: 'minimum value is required'
//     //     },
//     //     isNumeric: {
//     //         errorMessage: 'it should be number'
//     //     }
//     // },
//     // 'salary.max' : {
//     //     notEmpty: {
//     //         errorMessage: 'maximum value is required'
//     //     },
//     //     isNumeric: {
//     //         errorMessage: 'it should be number'
//     //     },
//     //     custom: {
//     //         options: function(value,  { req } ){
//     //             if(value < req.body.salary.min) {
//     //                 throw new Error('max should be greater than min')
//     //             }
//     //             return true 
//     //         }
//     //     }
//     // },
//     deadline: {
//        notEmpty: {
//         errorMessage: 'Deadline is required'
//        },
//        isDate: {
//         errorMessage: 'should be a valid date format'
//        }, 
//        custom: {
//         options: function(value){
//             if(new Date(value) < new Date()) {
//                 throw new Error('deadline cannot be less than today')
//             }
//             return true 
//         }
//        }
//     } // should the greater than today 
// }

// module.exports = jobValidationSchema

// /*

// function Add({ a, b }) {
//     return <h1> { a} + { b} = { a + b } </h1> 
// }

// <Add a={10} b={20} /> 

// */ 

// /*
//     // es7 
//     const user = await User.findById(id) 
//     const comments = await Comment.find({ userId: user._id })
//     console.log(comments) 
//     console.log(10)

//     // es6
//     User.findById(id)
//         .then((user) => {
//             Comment.find({ userId: user._id }) 
//                 .then((comments) => {
//                     console.log(comments)
//                 })
//         })
//     console.log(10)


//     // es5
//     setTimeout(() => {
//         console.log('user')
//         setTimeout(() => {
//             console.log('comments')
//         }, 1000)
//     },1000)
//     console.log(10) 


//     const users = await User.find()
//     const orders = await Order.find() 

//     User.find()
//         .then((users) => {
//             console.log(users)
//         })
        
//     Order.find()
//         .then((orders) => {
//             console.log(orders)
//         })

    
// */