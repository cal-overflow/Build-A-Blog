import { mount } from "@vue/test-utils";
import Chance from "chance";
import ContactForm from '@/components/ContactForm.vue';

const chance = new Chance();

describe('ContactForm', () => {
  let wrapper, query;

  describe('default (given there are no error query params)', () => {
    beforeEach(() => {
      wrapper = mount(ContactForm, {
        mocks: {
          $route: {query: []}
        }
      });
    });

    it('renders the name label and input', () => {
      expect(wrapper.find('[for="name"]').element.innerHTML).toEqual('Name');
      expect(wrapper.find('[name="name"]').exists()).toBeTruthy();
    });

    it('renders the topic label and input', () => {
      expect(wrapper.find('[for="topic"]').element.innerHTML).toEqual('Topic');
      expect(wrapper.find('[name="topic"]').exists()).toBeTruthy();
    });

    it('renders the message label and placeholder correctly', () => {
      expect(wrapper.find('[for="message"]').element.innerHTML).toEqual('Message');
      expect(wrapper.find('[name="message"]').element.placeholder).toEqual('Your website is awesome! 🤩');
    });
  });

  describe('given there are query params entailing an error', () => {
    
    beforeEach(() => {
      query = {
        statusCode: chance.integer({min: 400, max: 599}),
        path: chance.string(),
        detail: chance.sentence(),
      };

      wrapper = mount(ContactForm, {
        mocks: {
          $route: {query} 
        }
      });
    });

    it('renders the name label and input', () => {
      expect(wrapper.find('[for="extraFeedback"]').element.innerHTML).toEqual('Describe what happened when this error occurred');
      expect(wrapper.find('[name="extraFeedback"]').element.placeholder).toEqual('I saw an error when I tried viewing the blog post about your multiplayer pac-man game, CyRun.');
    });

    it('renders the topic label and placeholder correctly', () => {
      expect(wrapper.find('[for="topic"]').element.innerHTML).toEqual('Topic');
      expect(wrapper.find('[name="topic"]').element.placeholder).toEqual(`${query.statusCode} error`);
    });

    it('renders the extra feedback label and placeholder correctly', () => {
      expect(wrapper.find('[for="extraFeedback"]').element.innerHTML).toEqual('Describe what happened when this error occurred');
      expect(wrapper.find('[name="extraFeedback"]').element.placeholder).toEqual('I saw an error when I tried viewing the blog post about your multiplayer pac-man game, CyRun.');
    });

    it('renders the error information', () => {
      expect(wrapper.find('[name="statusCode"]').element.value).toEqual(`${query.statusCode}`);
      expect(wrapper.find('[name="path"]').element.value).toEqual(`${query.path}`);
      expect(wrapper.find('[name="errorDetails"]').element.value).toContain(`${query.detail}`);
    });
  });
});