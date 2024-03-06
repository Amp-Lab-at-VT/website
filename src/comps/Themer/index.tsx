import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function Themer() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Button
            variant='subtle'
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle color scheme" >

            {computedColorScheme === 'light' ?
                <IconMoon stroke={1.5} /> :
                <IconSun
                    width={20}
                    height={20}
                    stroke={1.5} />}

        </Button>
    );
}
