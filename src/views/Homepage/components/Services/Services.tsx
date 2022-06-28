import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useWindowSize from 'hooks/useDimensions'
import { ServiceData } from 'state/types'
import { useFetchHomepageServiceStats, useHomepageServiceStats } from 'state/hooks'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useTranslation } from 'contexts/Localization'
import { ServiceWrapper, YieldCard, ColorWrap, Bubble } from './styles'
import { defaultServiceData } from './defaultServiceData'

const Services: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [loadServices, setLoadServices] = useState(false)
  useFetchHomepageServiceStats(loadServices)
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const serviceData = useHomepageServiceStats()
  const displayData =
    serviceData &&
    defaultServiceData(t).map((service) => {
      return { ...service, stats: serviceData[service.id] }
    })
  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(defaultServiceData.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - defaultServiceData.length === defaultServiceData.length
        ? 0
        : event.activeIndex - defaultServiceData.length,
    )
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadServices(true)
    }
  }, [isIntersecting])

  const handleEachService = (id: string, service: ServiceData) => {
    if (id === 'farmDetails' || id === 'poolDetails' || id === 'billDetails') {
      const tokenImage =
        id === 'farmDetails'
          ? service.stakeToken.name.split('-')
          : id === 'billDetails'
          ? service.lpTokenName.split('-')
          : [service.stakeToken.name, service.rewardToken.name]
      const name =
        id === 'farmDetails'
          ? service.stakeToken.name
          : id === 'billDetails'
          ? service.lpTokenName
          : service.rewardToken.name
      return { name, tokenImage }
    }
    if (id === 'lendingDetails') {
      return { name: service.marketName, tokenImage: [service.token.name] }
    }
    return {}
  }

  const displayStats = (id: string, link: string, stats: ServiceData[]) => {
    return (
      <>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          style={{ position: 'absolute', bottom: '60px', height: '250px', width: '300px' }}
        >
          {stats?.map((stat) => {
            const { name, tokenImage } = handleEachService(id, stat)
            return (
              <a href={stat.link} rel="noopener noreferrer" key={stat?.apr}>
                <Flex
                  mt="5px"
                  mb="5px"
                  pl="20px"
                  style={{
                    width: '100%',
                    height: '70px',
                    background: 'rgba(11, 11, 11, .55)',
                    borderRadius: '10px',
                  }}
                >
                  {id === 'farmDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3={stat.rewardToken.name}
                      stakeLp
                      iconFill="white"
                    />
                  ) : id === 'billDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3="BANANA"
                      stakeLp
                      billArrow
                      iconFill="white"
                    />
                  ) : id === 'poolDetails' ? (
                    <ServiceTokenDisplay token1={tokenImage[0]} token2={tokenImage[1]} iconFill="white" />
                  ) : (
                    <ServiceTokenDisplay token1={tokenImage[0]} />
                  )}
                  <Flex pl="15px" justifyContent="center" flexDirection="column">
                    <Text bold style={{ width: '100%', color: 'white' }}>
                      {name}
                    </Text>
                    {id === 'lendingDetails' ? (
                      <Text style={{ width: '100%', color: 'white' }}>APY: {stat.apy.toFixed(2)}%</Text>
                    ) : id === 'billDetails' ? (
                      <Text style={{ width: '100%', color: 'white' }}>
                        Discount:{' '}
                        <span style={{ color: stat.discount > 0 ? 'white' : '#DF4141' }}>
                          {stat.discount.toFixed(2)}%
                        </span>
                      </Text>
                    ) : (
                      <Text style={{ width: '100%', color: 'white' }}>APR: {(stat.apr * 100).toFixed(2)}%</Text>
                    )}
                  </Flex>
                </Flex>
              </a>
            )
          })}
        </Flex>
        <a href={link} rel="noopener noreferrer">
          <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
            <Text color="white" fontSize="16px" bold>
              {t('See All')} {'>'}
            </Text>
          </Flex>
        </a>
      </>
    )
  }

  return (
    <>
      <div ref={observerRef} />
      <ColorWrap>
        <ServiceWrapper>
          {displayData ? (
            width < 1488 ? (
              <Swiper
                id="serviceSwiper"
                initialSlide={0}
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={defaultServiceData.length}
                loop
                centeredSlides
                resizeObserver
                lazy
                preloadImages={false}
                onSlideChange={handleSlide}
                breakpoints={{
                  480: {
                    centeredSlides: false,
                  },
                }}
              >
                {displayData?.map((service) => {
                  return (
                    <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={service.title}>
                      <YieldCard image={service.backgroundImg}>
                        <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                          <Flex flexDirection="column">
                            <Flex>
                              <Text color="white" fontSize="23px" bold>
                                {service.title}
                              </Text>
                            </Flex>
                            <Flex padding="0px 40px 0px 0px">
                              <Text color="white" bold fontSize="15px">
                                {service.description}
                              </Text>
                            </Flex>
                          </Flex>
                          {displayStats(service.id, service.link, service.stats)}
                        </Flex>
                      </YieldCard>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              displayData?.map((service) => {
                return (
                  <YieldCard image={service.backgroundImg} key={service.id}>
                    <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                      <Flex flexDirection="column">
                        <Flex>
                          <Text color="white" fontSize="23px" bold>
                            {service.title}
                          </Text>
                        </Flex>
                        <Flex padding="0px 40px 0px 0px">
                          <Text color="white" bold fontSize="15px">
                            {service.description}
                          </Text>
                        </Flex>
                      </Flex>
                      {displayStats(service.id, service.link, service.stats)}
                    </Flex>
                  </YieldCard>
                )
              })
            )
          ) : (
            [...Array(4)].map(() => {
              return (
                <YieldCard>
                  <Skeleton height="100%" width="100%" />
                </YieldCard>
              )
            })
          )}
          <Flex
            justifyContent="center"
            alignContent="center"
            style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
          >
            {[...Array(defaultServiceData.length)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} />
            })}
          </Flex>
        </ServiceWrapper>
      </ColorWrap>
    </>
  )
}

export default React.memo(Services)
