import Container from 'Components/Common/Container';
import {
  Form,
  Typography,
  Input,
  Tag,
  Table,
  Select,
  Button,
  Space,
  Divider,
  Row,
  Col,
  Upload,
  Modal
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAPI from 'api/user';


const { Title, Text } = Typography;
const { Search } = Input;
export default function Account() {
  const [userId, setUserId] = useState(2);

  const [user, setUser] = useState();

  const [editingUser, setEditingUser] = useState({ ...user });

  const [isEditing, setIsEditing] = useState(false);

  // change password modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [reNewPassword, setReNewPassword] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');

  const handleChangePassword = () => {
    setIsModalOpen(true);
  }

  // type password
  const handleTypeCurrentPassword = (e) => {
    const { value } = e.target;
    setCurrentPassword(value);
  };

  const handleTypeNewPassword = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleTypeReNewPassword = (e) => {
    const { value } = e.target;
    setReNewPassword(value);
  };

  const handleSavePassword = async () => {
    if (reNewPassword != newPassword) {
      setPasswordMessage('New passwords not match');
    } else {
      const password_data = {
        userId: user.id,
        current_password: currentPassword,
        new_password: newPassword
      }

      const res = await userAPI.changePassword(password_data);
      console.log("data: ", password_data, res);
      if (res.code === '201') {
        setPasswordMessage('Current password is incorrect');
      } else {
        setPasswordMessage('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setReNewPassword('');
        setIsModalOpen(false);
      }
    }
    toast(passwordMessage, {
      position: 'top-right',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setEditingUser(user);
    console.log('user', user, editingUser);
  };

  const handleSave = () => {
    undateUserInfo()
    toast('Updated successfully', {
      position: 'top-right',
    });
    console.log('editing user: ', editingUser);
    setIsEditing(false);
  }

  const undateUserInfo = async () => {
    await userAPI.updateUserInfo(editingUser);
  }

  const getUserById = async () => {
    const user = await userAPI.getUserById(userId);
    setUser(user);
  }

  useEffect(() => {
    getUserById();
  }, [userId])

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="max-w-[800px] m-auto">
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Account Infomation - {user.username}</Title>
        </Col>
        <Col>
          <Row align="middle">
            <img
              src={user.avatar}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full me-xl"
            />
            {/* <Upload>
              <Button type="primary">Change</Button>
            </Upload> */}

          </Row>
        </Col>
      </Row>
      <Divider />
      <div>

        <Row>
          <Col>
            <UserOutlined className="text-4xl pe-xl" />
          </Col>
          <Col flex={1}>
            <Row justify={'space-between'} align="middle">
              <Text strong>Full name</Text>
              <Input
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
              />
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col>
            <PhoneOutlined className="text-4xl pe-xl" />
          </Col>
          <Col flex={1}>
            <Row justify={'space-between'} align="middle">
              <Text strong>Phone number</Text>
              <Input
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
              />
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col>
            <HomeOutlined className="text-4xl pe-xl" />
          </Col>
          <Col flex={1}>
            <Row justify={'space-between'} align="middle">
              <Text strong>Address</Text>
              <Input
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col>
            <MailOutlined className="text-4xl pe-xl" />
          </Col>
          <Col flex={1}>
            <Row justify={'space-between'} align="middle">
              <Text strong>Email</Text>
              <Input
                name="email"
                value={user.email}
                disabled="true"
              />
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col>
            <LockOutlined className="text-4xl pe-xl" />
          </Col>
          <Col flex={1}>
            <Row justify={'space-between'} align="middle">
              <Text strong>Password</Text>
              {/* <Input
                name="password"
                value={user.password}
              /> */}
              <Button onClick={handleChangePassword}>Change Password</Button>
            </Row>
            <Divider />
          </Col>
        </Row>

        <Row justify="end">
          <Space>
            {/* <Button type="primary" danger>
              Cancel
            </Button> */}
            <Button type="primary" onClick={handleSave}>Save</Button>
            <ToastContainer />
          </Space>
        </Row>

      </div>
      {isModalOpen ? (
        <Modal
          title="Change Password"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          bodyStyle={{ textAlign: 'center' }}
          cancelButtonProps={{ type: 'default' }}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSavePassword}
              disabled={currentPassword === '' || newPassword === '' || reNewPassword === ''}
            >
              Save Change
            </Button>
          ]}
        >
          <Row>
            <Col flex={1}>
              <Row justify={'space-between'} align="middle">
                <Text strong>Current password</Text>
                <Input.Password
                  name="password"
                  placeholder="Current password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={handleTypeCurrentPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>

          <Row>
            <Col flex={1}>
              <Row justify={'space-between'} align="middle">
                <Text strong>New Password</Text>
                <Input.Password
                  name="new_password"
                  placeholder="New Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={handleTypeNewPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>

          <Row>
            <Col flex={1}>
              <Row justify={'space-between'} align="middle">
                <Text strong>Re-enter new Password</Text>
                <Input.Password
                  name="re_new_password"
                  placeholder="Re-enter new Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={handleTypeReNewPassword}
                />
              </Row>
              <Divider />
            </Col>
          </Row>

        </Modal>
      ) : (
          ''
        )}
    </Container>
  );
}
