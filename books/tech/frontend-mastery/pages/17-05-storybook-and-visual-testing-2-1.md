### A story

```bash
npx storybook@latest init
```

```tsx
// components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Save changes' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story   = { args: { variant: 'default' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Loading: Story   = { args: { loading: true } };
export const LongLabel: Story = {
  args: { children: 'Save changes and continue to the next step' },
};
```

Note `satisfies Meta<typeof Button>`. That is the operator from Module 5 doing
real work: the story `args` are checked against the component's actual props, so
a renamed prop breaks the story at compile time instead of at review time.
