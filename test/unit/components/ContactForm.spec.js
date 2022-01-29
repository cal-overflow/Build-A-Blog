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

    it('computes the correctly formatted mailto link', async () => {
      const name = chance.string();
      const message = chance.paragraph();
      const body = `${message}\n\nFrom: ${name}`;

      const expectedLink = `mailto:lisleachristian@gmail.com?subject=${encodeURIComponent('Website Contact Form')}&body=${encodeURIComponent(body)}`;

      wrapper.find('[name="name"]').setValue(name);
      wrapper.find('[name="message"]').setValue(message);

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.mailLink).toEqual(expectedLink);
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
      expect(wrapper.find('[for="message"]').element.innerHTML).toEqual('Describe what happened when this error occurred');
      expect(wrapper.find('[name="message"]').element.placeholder).toEqual('I saw an error when I tried viewing the blog post about your multiplayer pac-man game, CyRun.');
    });

    it('renders the topic label and placeholder correctly', () => {
      expect(wrapper.find('[for="topic"]').element.innerHTML).toEqual('Topic');
      expect(wrapper.find('[name="topic"]').element.placeholder).toEqual(`${query.statusCode} error`);
    });

    it('renders the error information', () => {
      expect(wrapper.find('[name="statusCode"]').element.value).toEqual(`${query.statusCode}`);
      expect(wrapper.find('[name="path"]').element.value).toEqual(`${query.path}`);
      expect(wrapper.find('[name="errorDetails"]').element.value).toContain(`${query.detail}`);
    });

    it('computes the correctly formatted mailto link', async () => {
      const name = chance.string();
      const extraFeedback = chance.paragraph();
      const body = `Error information:\nStatus Code: ${query.statusCode}\nPath: ${query.path}\nDetail: ${query.detail}\n\nFeedback:\n${extraFeedback}\n\nFeedback provided by: ${name}`;
      const expectedLink = `mailto:lisleachristian@gmail.com?subject=${encodeURIComponent('Website Contact Form')}&body=${encodeURIComponent(body)}`;

      wrapper.find('[name="name"]').setValue(name);
      wrapper.find('[name="message"]').setValue(extraFeedback);

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.mailLink).toEqual(expectedLink);
    });
  });
  describe('given there are query parameters entailing feedback for the memory-download app', () => {

    beforeEach(() => {
      query = {
        memoryDownload: true,
        photos: chance.integer({min: 0}),
        videos: chance.integer({min: 0}),
      };

      wrapper = mount(ContactForm, {
        mocks: {
          $route: {query} 
        }
      });
    });

    it('renders the name label and input', () => {
      expect(wrapper.find('[for="message"]').element.innerHTML).toEqual('Feedback');
      expect(wrapper.find('[name="message"]').element.placeholder).toEqual('I downloaded the app, but my download is stuck at 20%');
    });

    it('renders the topic label and placeholder correctly', () => {
      expect(wrapper.find('[for="topic"]').element.innerHTML).toEqual('Topic');
      expect(wrapper.find('[name="topic"]').element.placeholder).toEqual('Memory Downloader feedback');
    });

    it('renders the photo and video counts', () => {
      expect(wrapper.find('[name="photoCount"]').element.value).toEqual(`${query.photos}`);
      expect(wrapper.find('[name="videoCount"]').element.value).toEqual(`${query.videos}`);
    });

    it('computes the correctly formatted mailto link', async () => {
      const name = chance.string();
      const feedback = chance.paragraph();
      const appUseInfo = `Information from app:\nPhotos: ${query.photos}\nVideos: ${query.videos}\n\n`;
      const body = `${appUseInfo}Feedback:\n${feedback}\n\nFrom:\n${name}`;
      const expectedLink = `mailto:lisleachristian@gmail.com?subject=${encodeURIComponent('Website Contact Form')}&body=${encodeURIComponent(body)}`;


      wrapper.find('[name="name"]').setValue(name);
      wrapper.find('[name="message"]').setValue(feedback);

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.mailLink).toEqual(expectedLink);
    });
  });
});