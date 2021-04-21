import React, { FunctionComponent } from 'react'
// import { useQuery } from '@apollo/client'
// import Loading from '../components/Loading'
// import { HOMEWORKS_QUERY } from '../graphql/homeworksQuery'

const Navbar = React.lazy(() => import('../../commons/Navbar'))
const PageContent = React.lazy(() => import('../../commons/PageContent'))

const BannerWrapper = React.lazy(() => import('../components/BannerWrapper'))
const PromotionWrapper = React.lazy(() => import('../components/PromotionWrapper'))
const ProductWrapper = React.lazy(() => import('../components/ProductWrapper'))

const HomePage: FunctionComponent = () => {
    // const { loading, error, data }: any = useQuery(HOMEWORKS_QUERY, { fetchPolicy: 'network-only' })
    // if (loading) {
    //     return (
    //     <Loading />
    //     )
    // }
    // if (error) {
    //     return 'Error !!'
    // }
    // const { myData } = data

    return (
        <div className="flex h-screen">
            <Navbar />
            <PageContent>
                <BannerWrapper />
                <PromotionWrapper />
                <ProductWrapper />
            </PageContent>
        </div>
    );
}

export default HomePage;
