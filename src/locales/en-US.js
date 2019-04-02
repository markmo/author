import analysis from './en-US/analysis';
import exception from './en-US/exception';
import form from './en-US/form';
import contentForm from './en-US/contentForm';
import globalHeader from './en-US/globalHeader';
import login from './en-US/login';
import menu from './en-US/menu';
import monitor from './en-US/monitor';
import result from './en-US/result';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import pwa from './en-US/pwa';
import component from './en-US/component';
import editor from './en-US/editor';

export default {
  'navBar.lang': 'Languages',
  'menu.intents': 'Intents',
  'menu.examples': 'Examples',
  'menu.entities': 'Entities',
  'menu.content': 'Content',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  'app.forms.basic.title': 'Basic form',
  'app.forms.content.title': 'Content Item',
  'app.forms.content.description': 'Create or update a content item.',
  'app.forms.basic.description':
    'Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.',
  ...analysis,
  ...exception,
  ...form,
  ...contentForm,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...editor,
};
