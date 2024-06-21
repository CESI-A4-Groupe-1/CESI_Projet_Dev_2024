import React, {useState, useEffect} from 'react'
import { Box, Button, H2, H5, Illustration, IllustrationProps, Text } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import {ApiClient, useTranslation} from 'adminjs'
// import RocketSVG from './utils/rocket-svg.js'
// import DiscordLogo from './utils/discord-logo-svg.js'

const pageHeaderHeight = 300
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement, Title
} from "chart.js";
import {Line} from "react-chartjs-2";
import {faker} from '@faker-js/faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const DashboardHeader: React.FC = () => {
    const { translateMessage } = useTranslation()
    return (
        <Box data-css="default-dashboard">
            <Box
                position="relative"
                overflow="hidden"
                bg="white"
                height={pageHeaderHeight}
                py={pageHeaderPaddingY}
                px={['default', 'lg', pageHeaderPaddingX]}
            >
                <Box position="absolute" top={30} left={0} opacity={0.9} animate display={['none', 'none', 'none', 'block']}>
                    {/*<RocketSVG />*/}
                </Box>
                <Text textAlign="center" color="grey100">
                    <H2 fontWeight="bold">Dashboard Commercial</H2>
                </Text>
            </Box>
        </Box>
    )
}

type BoxType = {
    variant: string
    title: string
    subtitle: string
    href: string
}

const boxes = ({ translateMessage }): Array<BoxType> => [
    {
        variant: 'Details',
        title: translateMessage('addingResources_title'),
        subtitle: translateMessage('addingResources_subtitle'),
        href: 'https://docs.adminjs.co/basics/resource#providing-resources-explicitly',
    }
]

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }) => theme.colors.grey100};
  height: 100%;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.space.md};
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg, .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`

Card.defaultProps = {
    variant: 'container',
    boxShadow: 'card',
}

export const Dashboard = () => {
    const { translateMessage, translateButton } = useTranslation()

    const [data, setData] = useState<any>(null);
    const api = new ApiClient();
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    useEffect(() => {
        api.getDashboard()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        setData({
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return (
        <Box>
            <DashboardHeader />
            <Box
                mt={['xl', 'xl', '-100px']}
                mb="xl"
                mx={[0, 0, 0, 'auto']}
                px={['default', 'lg', 'xxl', '0']}
                position="relative"
                flex
                flexDirection="row"
                flexWrap="wrap"
                width={[1, 1, 1, 1024]}
            >
                <Box
                    variant="card"
                    width={1}
                >
                    {data != null && <Line options={options} data={data}/>}
                </Box>
                {/*{boxes({ translateMessage }).map((box, index) => (*/}
                {/*    // eslint-disable-next-line react/no-array-index-key*/}
                {/*    <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">*/}
                {/*        <Card as="a" href={box.href} target="_blank">*/}
                {/*            <Text textAlign="center">*/}
                {/*                <Illustration*/}
                {/*                    variant={box.variant as IllustrationProps['variant']}*/}
                {/*                    width={100}*/}
                {/*                    height={70}*/}
                {/*                />*/}
                {/*                <H5 mt="md">{box.title}</H5>*/}
                {/*                <Text>{box.subtitle}</Text>*/}
                {/*            </Text>*/}
                {/*        </Card>*/}
                {/*    </Box>*/}
                {/*))}*/}
                {/*<Card width={1} m="lg">*/}
                {/*    <Text textAlign="center">*/}
                {/*        <Illustration variant="AdminJSLogo" />*/}
                {/*        <H5>{translateMessage('needMoreSolutions_title')}</H5>*/}
                {/*        <Text>{translateMessage('needMoreSolutions_subtitle')}</Text>*/}
                {/*        <Text mt="xxl">*/}
                {/*            <Button as="a" variant="contained" href="https://forms.adminjs.co/" target="_blank">*/}
                {/*                {translateButton('contactUs')}*/}
                {/*            </Button>*/}
                {/*        </Text>*/}
                {/*    </Text>*/}
                {/*</Card>*/}
                {/*<Box width={[1, 1, 1 / 2]} p="lg">*/}
                {/*    <Card as="a" flex href="https://adminjs.page.link/discord" target="_blank">*/}
                {/*        <Box flexShrink={0} className="dsc-icon">*/}
                {/*            /!*<DiscordLogo />*!/*/}
                {/*        </Box>*/}
                {/*        <Box ml="xl">*/}
                {/*            <H5>{translateMessage('community_title')}</H5>*/}
                {/*            <Text>{translateMessage('community_subtitle')}</Text>*/}
                {/*        </Box>*/}
                {/*    </Card>*/}
                {/*</Box>*/}
                {/*<Box width={[1, 1, 1 / 2]} p="lg">*/}
                {/*    <Card*/}
                {/*        as="a"*/}
                {/*        flex*/}
                {/*        href="https://github.com/SoftwareBrothers/adminjs/issues"*/}
                {/*        target="_blank"*/}
                {/*    >*/}
                {/*        <Box flexShrink={0} className="gh-icon">*/}
                {/*            <Illustration variant="GithubLogo" />*/}
                {/*        </Box>*/}
                {/*        <Box ml="xl">*/}
                {/*            <H5>{translateMessage('foundBug_title')}</H5>*/}
                {/*            <Text>{translateMessage('foundBug_subtitle')}</Text>*/}
                {/*        </Box>*/}
                {/*    </Card>*/}
                {/*</Box>*/}
            </Box>
        </Box>
    )
}

export default Dashboard