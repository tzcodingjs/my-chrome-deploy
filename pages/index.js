import { useState } from 'react'
import { Modal, Button, Form, Input } from 'antd';
import Head from 'next/head'
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css'

export default function Home () {
  const [form] = Form.useForm();
  const [isShow, setShow] = useState(false)
  const [srcList, setSrcList] = useState([{
    url: 'https://www.baidu.com',
    img: '/googlelogo.png',
    title: 'google'
  }])
  const onShowModal = () => {
    setShow(true)
  }
  const onDelete = () => {

  }
  const handleCancel = () => {
    setShow(false)
  }
  const onConfirm = () => {
    form.validateFields().then(values => {
      setSrcList([
        ...srcList,
        {
          url: values.url,
          img: `${values.url}/favicon.ico`,
          title: values.name
        }
      ])
    })
    setShow(false)
  }
  return (
    <div>
      <Head>
        <title>My-chrome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.logo}>
          <img src="/googlelogo.png" alt="google" width="272" height="92" />
        </div>
        <div>
          <input className={styles.input} type="text" />
        </div>
        <div className={styles.srcList}>
          {
            srcList?.map((item, index) => {
              return (
                <a className={styles.a} href={item.url} key={index} target="_blank">
                  <div className={styles.item}>
                    <div className={styles.itemImg}>
                      <img src={item.img} alt="google" width="30" height="30" />
                    </div>
                    <span className={styles.title}>{item.title}</span>
                  </div>
                </a>
              )
            })
          }
          <div className={styles.item} onClick={() => { onShowModal() }}>
            <div className={styles.itemImg}>
              <div className={styles.plus}>+</div>
            </div>
            <span className={styles.title}>添加快捷方式</span>
          </div>
        </div>
      </main>
      <Modal
        title="添加快捷方式"
        centered
        onCancel={handleCancel}
        visible={isShow}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <Form
            form={form}
          >
            <Form.Item
              label="名称"
              name='name'
              initialValue=""
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              label="网址"
              name="url"
              initialValue="https://"
            >
              <Input placeholder="" />
            </Form.Item>
          </Form>
          <div className={styles.btnGroup}>
            {/* <Button onClick={onDelete()}>删除</Button> */}
            <div>
              <Button className={styles.btnDel} onClick={handleCancel}>取消</Button>
              <Button onClick={onConfirm}>完成</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
