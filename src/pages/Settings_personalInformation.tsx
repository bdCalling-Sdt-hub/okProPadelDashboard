import React, { useState } from 'react';
import { Upload, Input, Button, Form } from 'antd';
import type { UploadFile, UploadProps, FormProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

type FileType = Exclude<Parameters<UploadProps['beforeUpload']>[0], undefined>; // Correct type for File

interface FieldType {
  name?: any;
  username?: string;
  password?: string;
  remember?: boolean;
}

const Settings_personalInformation: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='border border-gray-200 h-[80vh] py-12 rounded-2xl flex flex-col items-center'>
      {/* Upload section */}
      <div className='flex justify-center mb-6'>
        <ImgCrop rotationSlider>
          <Upload
            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>

      {/* Input Form */}
      <Form
        name="basic"
        layout="vertical"
        style={{ width: '100%', maxWidth: '800px', marginTop: "50px" }} // Ensures the form and its elements are centered
        initialValues={{ name:""}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Email' className='h-12' value="Jillur" />
        </Form.Item>

        <Form.Item<FieldType>
          name="oldPassword"
          rules={[{ required: true, message: 'Please input your old password!' }]}
        >
          <Input.Password
            placeholder='Old Password'
            className='h-12'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password
            placeholder='New Password'
            className='h-12'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            placeholder='Confirm Password'
            className='h-12'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" className='w-full h-12 bg-[#4964C6]' htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings_personalInformation;
