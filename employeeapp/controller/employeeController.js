// const express = require('express');
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

const { transporter } = require("../service/emailService");
const employeeLogger = require("../../utils/employeeLogger");
let employeeSchema = require("../../models/employeeSchema");
let {isEmployee}  = require("../service/authService");
const authService = require("../service/authService");

//....signup API.....
module.exports = {
  createEmployee: async (req, res) => {
    let empData = new employeeSchema(req.body);
    try {
      let data = await authService.isEmployee(req.body.empEmail);
      if (data) {
        employeeLogger.log(
          "error",
          "Employee already registered with this email"
        );
        res.status(401).json({
          success: false,
          message: "Employee is already registerd with this email",
        });
      } else {
        if (empData.empGender === "male") {
          let filePath = path.join(__dirname, "..","..","uploads/male.png");
          empData.profilePic = filePath;
        } else {
          let filePath = path.join(__dirname, "..","..","uploads/female.png");
          empData.profilePic = filePath;
        }
        const salt = await bcrypt.genSalt(10);
        empData.empPassword = await bcrypt.hash(req.body.empPassword, salt);
        empData.pastPassword.push(empData.empPassword)
        const employee = await empData.save();
        employeeLogger.log("info", "Employee register successfully");
        res.status(201).json({
          success: true,
          message: "Employee successfully registered",
          employee: employee,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  //....login API.....
  employeeLogin: async (req, res) => {
    try {
      let { value, token } = await authService.validateEmployee(
        req.body.empEmail,
        req.body.empPassword
      );
      if (value) {
        employeeLogger.log("info", "Employee login successfully");
        res.status(200).json({
          success: true,
          mesage: "Login successfully",
          accesstoken: token,
        });
      } else {
        employeeLogger.log("error", "Employee email or password invalid");
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur${error.message}`,
      });
    }
  },

  //..........emailSend API.........
  sendEmployeeResetPasswordEmail: async (req, res) => {
    const { empEmail } = req.body;
    try {
      let { empData, token } = await authService.validateEmployee(
        req.body.empEmail
      );
      if (empData) {
        const link = `http://127.0.0.1:3000/employee/resetPassword/${empData._id}/${token}`;
        let info = await transporter.sendMail({
          from: "nodemailertest5555@gmail.com",
          to: empEmail,
          subject: "email for employee reset password",
          html: `<a href=${link}>click Here For Rest Password`,
        });
        employeeLogger.log("info", "Email Send Successfully");
        res.status(201).json({
          success: true,
          message: "Email Send Successfully ",
          token: token,
          userID: empData._id,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  //.......resetPassword API........
  employeeResetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    let isPasswordExist = false;
    try {
      const checkEmployee = await employeeSchema.findById(id);
      if (checkEmployee != null) {
        const secretKey = checkEmployee._id + process.env.SECRET_KEY;
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
          await employeeSchema.findByIdAndUpdate(checkEmployee._id, {
            $set: { empPassword: bcryptPassword },
          });
          for(let oldPassword of checkEmployee.pastPassword){
            if(await bcrypt.compare(newPassword,oldPassword)){
              isPasswordExist=true;
              break;
            }
          } 
          if(isPasswordExist){
            employeeLogger.log("error", "Dont use old passord,try another password");
            return  res.status(409).json({
              success : false,
              error:"Dont use old passord"
            })
          }
          checkEmployee.pastPassword.push(bcryptPassword);
          await checkEmployee.save();
          employeeLogger.log("info", "Password update successfully");
          res.status(201).json({
            success: true,
            message: "Password update successfully",
          });
        } else {
          employeeLogger.log("error","Password and confirmPassword is not matched");
          res.status(403).json({
            success: false,
            message: "Password and confirmPassword is not matched",
          });
        }
      } else {
        employeeLogger.log("error", "Your email is not correct");
        res.status(403).json({
          success: false,
          message: "Your email is not correct",
        });
      }
    } catch (error) {
      employeeLogger.log("error", `Error: ${error}`);
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  //......changePassword API ..........
  changePassword: async (req, res) => {
    const empId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    let isPasswordExist = false;
    try {
      const empData = await employeeSchema.findById(empId);
      const checkPass = await bcrypt.compare(oldPassword, empData.empPassword);
      if (checkPass) {
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, salt); // Remove parseInt()
          empData.empPassword = hashPassword;
          for(let oldPassword of empData.pastPassword){
            if(await bcrypt.compare(newPassword,oldPassword)){
              isPasswordExist=true;
              break;
            }
          } 
          if(isPasswordExist){
            employeeLogger.log("error", "Dont use old passord,try another password");
            return  res.status(409).json({
              success : false,
              error:"Dont use old passord"
            })
          }
          empData.pastPassword.push(hashPassword)
          await empData.save()
          employeeLogger.log("info", "Password updated successfully");
          await empData.save(); // Save the updated employee data
          res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          employeeLogger.log(
            "error",
            "newPassword and confirmPassword do not match"
          );
          res.status(400).json({
            success: false,
            message: "newPassword and confirmPassword do not match",
          });
        }
      } else {
        employeeLogger.log("error", "Old password is incorrect");
        res.status(400).json({
          success: false,
          message: "Old password is incorrect",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  //.......updateProfilePic API ........
  updateProfilePic: async (req, res) => {
    try {
      const empId = req.params.id;
      const empAddress = req.body.empAddress;
      const newProfilePic = req.file
        ? `/uploads/employee${req.file.filename}`
        : undefined;
      const updatedEmployee = await employeeSchema.findByIdAndUpdate(
        empId,
        {
          profilePic: newProfilePic,
          empAddress: empAddress,
        },
        { new: true }
      );
      if (!updatedEmployee) {
        employeeLogger.log("error", "Employee not found");
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      } else {
        employeeLogger.log(
          "info",
          "Profile pic and address updated successfully"
        );
        res.status(200).json({
          success: true,
          message: "Profile pic and address updated successfully ✔",
        });
      }
    } catch (error) {
      employeeLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}