import React, { useEffect, useState } from 'react';
import { Upload, Input, Button, Form, message } from 'antd';
import type { UploadFile, UploadProps, FormProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useGetPersonalInformationQuery } from '../redux/features/getPersonalInformationApi';
import { useUpdatePersonalInformationMutation } from '../redux/features/putUpdatePersonalInfromation';

type FileType = Exclude<Parameters<UploadProps['beforeUpload']>[0], undefined>;

interface FieldType {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SettingsPersonalInformation: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  // Fetch personal information data
  const { data, isLoading, isError } = useGetPersonalInformationQuery();
  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();
console.log("28", previewImage);
  useEffect(() => {
    if (data && data.data) {
      form.setFieldsValue({
        name: data.data.full_name,
        email: data.data.email,
      });

      if (data.data.image) {
        const imageUrl = data.data.image;
        console.log(imageUrl);
        setFileList([
          {
            uid: '-1',
            name: 'profile.png',
            status: 'done',
            url: imageUrl,
          } as UploadFile,
        ]);
        setPreviewImage(imageUrl);
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

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!fileList.length || !fileList[0].originFileObj) {
      message.error("Please upload a profile image");
      return;
    }

    // Create a FormData object and append form values
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("full_name", values.name || "");
    formData.append("old_password", values.oldPassword || "");
    formData.append("new_password", values.newPassword || "");
    formData.append("confirm_password", values.confirmPassword || "");

    // Append the image file as a File object
    const imageFile = fileList[0].originFileObj as File;
    formData.append("image", imageFile, imageFile.name);

    try {
      await updatePersonalInformation(formData);
      message.success("Profile updated successfully");
      console.log("FormData content:", Array.from(formData.entries()));
    } catch (error) {
      message.error("Failed to update profile");
    }
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
          name="name"
          label="Name"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" className='h-12' />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" className='h-12' />
        </Form.Item>
        <Form.Item<FieldType>
          name="oldPassword"
          label="Old Password"
          rules={[{ required: true, message: 'Please input your old password!' }]}
        >
          <Input.Password
            placeholder='Old Password'
            className='h-12'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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

export default SettingsPersonalInformation;
