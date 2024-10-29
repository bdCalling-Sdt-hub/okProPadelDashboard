import React, { useEffect, useState } from 'react';
import { Upload, Input, Button, Form, message } from 'antd';
import type { UploadFile, UploadProps, FormProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useGetPersonalInformationQuery } from "../redux/features/getPersonalInformation";

type FileType = Exclude<Parameters<UploadProps['beforeUpload']>[0], undefined>;

interface FieldType {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Settings_personalInformation: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  // Fetch personal information data
  const { data, isLoading, isError } = useGetPersonalInformationQuery();

  useEffect(() => {
    if (data && data.data) {
      console.log("Fetched data:", data); // Debugging check for fetched data

      form.setFieldsValue({
        name: data.data.full_name,
        email: data.data.email,
      });

      // Check and set image URL
      if (data.data.image) {
        const imageUrl = data.data.image;
        console.log("Image URL:", imageUrl); // Debugging check for image URL

        setFileList([
          {
            uid: '-1',
            name: 'profile.png',
            status: 'done',
            url: imageUrl,
            thumbUrl: imageUrl, // Adding thumbUrl for Upload preview
          } as UploadFile,
        ]);

        setPreviewImage(imageUrl); // Set preview image as a fallback
      }
    } else if (isError) {
      message.error("Failed to load personal information");
    }
  }, [data, isError, form]);

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
    console.log('Form submitted with values:', values);
    message.success("Profile updated successfully");
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='border border-gray-200 h-[80vh] py-12 rounded-2xl flex flex-col items-center'>
      <div className='flex justify-center mb-6'>
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
        {/* Fallback Preview Image */}
        {!fileList.length && previewImage && (
          <img src={previewImage} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        )}
      </div>

      <Form
        name="basic"
        form={form}
        layout="vertical"
        style={{ width: '100%', maxWidth: '800px', marginTop: "50px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder='Email' className='h-12' />
        </Form.Item>

        <Form.Item<FieldType>
          name="oldPassword"
          label="Old Password"
          rules={[{ required: true, message: 'Please input your old password!' }]}
        >
          <Input.Password
            placeholder='Old Password'
            className='h-12'
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password
            placeholder='New Password'
            className='h-12'
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            placeholder='Confirm Password'
            className='h-12'
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
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
