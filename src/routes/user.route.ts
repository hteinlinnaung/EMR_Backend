import express, { Router } from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

// Routes related to current user
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Routes restricted to admin
router.use(authController.restrictTo('admin'));

// Admin routes for user management
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
