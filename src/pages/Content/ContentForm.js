import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Icon,
  Upload,
  Modal,
  Menu
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PropertyGrid from 'react-property-grid';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

let id = 0;
let propId = 0;

// const ConnectedPropertyGrid = connect(({ schema }) => ({
//   schema,
// }))(PropertyGrid);

@connect(({ schema, loading }) => ({
  schema,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class ContentForm extends PureComponent {
  state = {
    current: 'answer',
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  addListItem = () => {
    const { form } = this.props;
    // can use data-binding to get
    const items = form.getFieldValue('listItems');
    const nextItems = items.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      listItems: nextItems,
    });
  };

  removeListItem = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const items = form.getFieldValue('listItems');
    // We need at least one passenger
    if (items.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      listItems: items.filter(item => item !== k),
    });
  };

  addProperty = () => {
    const { form } = this.props;
    // can use data-binding to get
    const props = form.getFieldValue('properties');
    const nextProps = props.concat(propId++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      properties: nextProps,
    });
  };

  removeProperty = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const props = form.getFieldValue('properties');
    // We need at least one passenger
    if (props.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      properties: props.filter(prop => prop !== k),
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { submitting, schema } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 7 },
        md: { span: 10, offset: 7 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    getFieldDecorator('listItems', { initialValue: [] });
    const items = getFieldValue('listItems');
    const listItems = items.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? formatMessage({ id: 'form.list.label' }) : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: <FormattedMessage id="validation.list.required" />,
          }],
        })(
          <Input
            placeholder={formatMessage({ id: 'form.list.placeholder' })}
            style={{ width: '90%', marginRight: 8 }}
          />
        )}
        {items.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={items.length === 1}
            onClick={() => this.removeListItem(k)}
          />
        ) : null}
      </FormItem>
    ));

    getFieldDecorator('properties', { initialValue: [] });
    const props = getFieldValue('properties');
    const properties = props.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? formatMessage({ id: 'form.properties.label' }) : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: <FormattedMessage id="validation.properties.required" />,
          }],
        })(
          <Input
            placeholder={formatMessage({ id: 'form.properties.placeholder' })}
            style={{ width: '90%', marginRight: 8 }}
          />
        )}
        {props.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={props.length === 1}
            onClick={() => this.removeProperty(k)}
          />
        ) : null}
      </FormItem>
    ));

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.content.title" />}
        content={<FormattedMessage id="app.forms.content.description" />}
      >
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="answer">
            Answer
          </Menu.Item>
          <Menu.Item key="procedure">
            Procedure
          </Menu.Item>
          <Menu.Item key="reference">
            Reference Topic
          </Menu.Item>
          <Menu.Item key="troubleshooting">
            Troubleshooting Topic
          </Menu.Item>
          <Menu.Item key="glossary">
            Glossary Entry
          </Menu.Item>
        </Menu>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.type.label" />}
            >
              <div>
                {getFieldDecorator('type', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="form.type.radio.plain" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="form.type.radio.list" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="form.type.radio.property-box" />
                    </Radio>
                    <Radio value="4">
                      <FormattedMessage id="form.type.radio.multimedia" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            {(getFieldValue('type') === '1' || getFieldValue('type') === '2') &&
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.plain.label" />}>
              {getFieldDecorator('plain', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'validation.plain.required'}),
                  },
                ],
              })(
                <TextArea
                  style={{width: '90%', minHeight: 32}}
                  placeholder={formatMessage({id: 'form.plain.placeholder'})}
                  rows={4}
                />
              )}
            </FormItem>
            }
            {getFieldValue('type') === '2' && listItems}
            {getFieldValue('type') === '2' &&
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.addListItem} style={{width: '90%'}}>
                <Icon type="plus" /> Add item
              </Button>
            </FormItem>
            }
            {/* {getFieldValue('type') === '3' && properties} */}
            {getFieldValue('type') === '3' &&
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.property-keys.label" />}
              help={<FormattedMessage id="form.property-keys.label.help" />}
            >
              {getFieldDecorator('propertyKeys', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.property-keys.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.property-keys.placeholder' })} />)}
            </FormItem>
            // <PropertyGrid schema={schema.schema} data={schema.data} />
            }
            {/* <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.addProperty} style={{width: '90%'}}>
                <Icon type="plus" /> Add property
              </Button>
            </FormItem> */}
            {getFieldValue('type') === '4' &&
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.multimedia.label" />}>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage} />
              </Modal>
            </FormItem>
            }
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ContentForm;
