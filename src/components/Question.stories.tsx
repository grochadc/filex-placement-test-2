import React from 'react';
import Question from './Question';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'Components/Question',
    component: Question,
    argTypes: {handleSelection: {action: 'handleSelection'}}
} as ComponentMeta<typeof Question>;

const Template: ComponentStory<typeof Question> = (args) => <Question {...args} />;

export const Normal = Template.bind({})
Normal.args = {
    questionIndex: 0,
    questionObj: {
        title:'A Question title?',
        options: [{text: 'First Option', correct: false}, {text: 'Second Option', correct: true}, {text: 'Third Option', correct: false}]
    }
}
