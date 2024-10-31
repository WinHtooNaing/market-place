import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../api/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await register(values);
      if (response.isSuccess) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
      setLoading(false);
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };
  const onFinishFailed = () => {
    toast.error("Registation Failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setLoading(false);
  };

  return (
    <>
      <section className="h-screen w-full flex items-center justify-center">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />

        <div className="w-3/5 md:w-[450px]">
          <h1 className="font-bold text-3xl text-blue-600 text-center mb-5">
            POINT.IO - REGISTER
          </h1>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  min: 3,
                  message: "Name must be at least 3!!",
                },
                {
                  max: 20,
                  message: "Name must be at most 20!!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Invalid your email",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6!!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={loading}
              >
                Register
                {loading && <Spin />}
              </Button>
            </Form.Item>
          </Form>
          <p className="text-center">
            Do you have an account?
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
export default Register;
