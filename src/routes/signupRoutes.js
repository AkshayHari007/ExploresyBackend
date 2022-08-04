const express = require('express');
const signupRouter = express.Router();
const Userdata = require('../model/userData');

signupRouter.get('/', (req, res) => {
    res.send('Signup routes created');
});

// signupRouter.post('/', async (req, res) => {
//     try {
//         var details = {
//             FirstName: req.body.FirstName,
// LastName: req.body.LastName,
//     Gender: req.body.Gender,
//     Dob: req.body.Dob,
//     Mobile: req.body.Mobile,
//     Email: req.body.Email,
//     Password: req.body.Password,
//     UserRole: req.body.UserRole
//         }
//         var user = Userdata(details);
//         await user.save();
//         res.json({
//             success: 1,
//             message: 'User successfully saved.'
//         });

//     } catch (error) {
//         res.json({
//             success: 0,
//             message: 'Something went wrong while saving the users' + error
//         });
//     }
// });

signupRouter.post('/adduser', async (req, res) => {
    try {
        // console.log('body', req.body)
        let existingUser = await Userdata.findOne({
            
            Email: req.body.Email
        })
        if (!existingUser) {

            const user = new Userdata({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Gender: req.body.Gender,
                Dob: req.body.Dob,
                Mobile: req.body.Mobile,
                Email: req.body.Email,
                Password: req.body.Password,
                UserRole: req.body.UserRole
            });
            let data = await user.save();
            res.json({
                success: 1,
                message: 'User successfully saved.',
                data: data
            })
        } else {
            res.json({
                success: 0,
                message: 'This Email Id already exist',
            })
        }
    } catch (error) {
        res.json({
            success: 0,
            message: 'Something went wrong while saving the users' + error
        })

    }
});

//get

// signupRouter.get('/', async (req, res) => {
//     try {
//         let allEmployess = await Userdata.find();
//         res.json({
//             success: 1,
//             message: 'Employees listed successfully',
//             items: allEmployess
//         })
//     } catch (error) {
//         res.json({
//             success: 0,
//             message: 'something went wrong while fetching list employees' + error,
//         })


//     }
// });

// signupRouter.get('/:id', async (req, res) => {
//     let id = req.params.id;
//     var isValid = mongoose.Types.ObjectId.isValid(id)
//     if (isValid) {
//         try {
//             let singleEmployee = await Userdata.findById({
//                 _id: id
//             })

//             res.json({
//                 success: 1,
//                 message: 'single Employee listed successfully',
//                 item: singleEmployee
//             })

//         } catch (error) {
//             res.json({
//                 success: 0,
//                 message: 'something went wrong' + error,
//             })
//         }

//     } else {
//         res.json({
//             success: 0,
//             message: 'invalid id',
//         })
//     }
// })

// signupRouter.put('/:id', async (req, res) => {
//     let id = req.params.id;
//     var isValid = mongoose.Types.ObjectId.isValid(id);
//     if (isValid) {
//         try {
//             let data = await Userdata.findByIdAndUpdate({
//                 _id: id
//             }, {
//                 $set: {
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     middleName: req.body.middleName,
//                     age: req.body.age
//                 },

//             })
//             res.json({
//                 success: 1,
//                 message: 'single Employee updated successfully',
//                 item: data,
//                 dataaa: dataaa
//             })

//         } catch (error) {
//             res.json({
//                 success: 0,
//                 message: 'something went wrong while editing' + error,
//             })
//         }
//     } else {
//         res.json({
//             success: 0,
//             message: 'invalid id',
//         })
//     }
// })

// //delete
// signupRouter.delete('/:id', async (req, res) => {
//     let id = req.params.id;
//     try {

//         await Userdata.deleteOne({
//             id: id
//         })
//         res.json({
//             success: 1,
//             message: 'employee deleted successfully'
//         })
//     } catch (error) {
//         res.json({
//             success: 0,
//             message: 'something went wrong' + error
//         })

//     }

// })



module.exports = signupRouter;