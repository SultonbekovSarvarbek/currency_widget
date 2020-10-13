<template>
  <div>
    <div class="container">
      <div class="tab">
        <div class="tabs__wrapper">
          <div class="tab__header">
            <h2>Курс EUR сегодня</h2>

            <div class="tabs__list">
              <div class="swiper-buttontab-prev">
                <span class="arrowtab lefttab"></span>
              </div>
              <swiper ref="mySwiperTab" :options="swiperOptionsTab">
                <swiper-slide
                  v-for="(item, index) in getNewTabs"
                  :key="item.id"
                >
                  <div
                    class="btnLink"
                    @click="selectTab(item.currency, index + 1)"
                    :class="{ activetab: currentTab == index + 1 }"
                  >
                    <div
                      type="button"
                      class="btn"
                      :class="{ activetabtext: currentTab == index + 1 }"
                    >
                      {{ item.currency }}
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="swiper-buttontab-next">
                <span class="arrowtab arrowtabnext"></span>
              </div>
            </div>
          </div>
          <div class="tab__content">
            <div class="tab__content-input">
              <input
                type="text"
                v-model.number="currencyValue"
                :placeholder="getTabs.base"
              />
              <p>{{ getTabs.base }}</p>
            </div>
          </div>
        </div>

        <div>
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide
              v-for="index in Math.round(filterValue.length / 4)"
              :key="index"
            >
              <div class="sliders__wrapper">
                <div v-for="n in 4" :key="n.id">
                  <div
                    class="card__item"
                    v-if="filterValue[(index - 1) * 4 + n]"
                  >
                    <p>
                      {{ currencyValue }} <span>{{ getTabs.base }} = </span>
                    </p>
                    <span>
                      {{
                        Math.round(filterValue[(index - 1) * 4 + n].value)
                          .toLocaleString("zh-ZH")
                          .split(",")
                          .join(" ")
                      }}

                      <small>{{
                        filterValue[(index - 1) * 4 + n].currency
                      }}</small>
                    </span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper__navg">
            <div class="swiper-button-prev">
              <span class="arrow left"></span>
              Назад
            </div>

            <div class="swiper-button-next">
              Далее
              <span class="arrow"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getNewTabs: [
        { currency: "EUR" },
        { currency: "CAD" },
        { currency: "HKD" },
        { currency: "ISK" },
        { currency: "PHP" },
        { currency: "DKK" },
        { currency: "HUF" },
        { currency: "CZK" },
        { currency: "AUD" },
        { currency: "RON" },
        { currency: "SEK" },
        { currency: "IDR" },
        { currency: "INR" },
        { currency: "BRL" },
        { currency: "RUB" },
        { currency: "HRK" },
        { currency: "JPY" },
        { currency: "THB" },
        { currency: "CHF" },
        { currency: "SGD" },
        { currency: "PLN" },
        { currency: "BGN" },
        { currency: "TRY" },
        { currency: "CNY" },
        { currency: "NOK" },
        { currency: "NZD" },
        { currency: "ZAR" },
        { currency: "USD" },
        { currency: "MXN" },
        { currency: "ILS" },
        { currency: "GBP" },
        { currency: "KRW" },
        { currency: "MYR" },
      ],
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionsTab: {
        navigation: {
          nextEl: ".swiper-buttontab-next",
          prevEl: ".swiper-buttontab-prev",
        },
        slidesPerView: 11,
        freeMode: true,
        breakpoints: {
          320: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 8,
          },
          880: {
            slidesPerView: 12,
          },
        },
      },
      currentTab: 1,
      baseCurrency: "",
      filterValue: [],
      currencyValue: "",
    };
  },
  computed: {
    getTabs() {
      return this.$store.getters.getTabs;
    },
  },
  mounted() {
    this.$store.dispatch("tabs");
  },
  watch: {
    currencyValue: function (val) {
      this.filterValue = [
        ...this.getTabs.rates.map((x) => {
          return {
            currency: x.currency,
            value: x.value * val,
          };
        }),
      ];
      this.$refs.mySwiper.$swiper.slideTo(0);
    },
  },

  methods: {
    selectTab(currency, selectedTab) {
      this.currentTab = selectedTab;
      this.$store.dispatch("getBase", currency);
      this.$refs.mySwiper.$swiper.slideTo(0);
      this.currencyValue = "";
    },
  },
};
</script>

<style scoped>
.arrowtabnext {
  margin-right: 0;
  margin-left: 6px;
}
.btnLink {
  cursor: pointer;
  text-align: center;
  padding: 15px 5px 15px 5px;
}
.activetab {
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  background-color: #fff;
}
.activetabtext {
  color: #2b2d33 !important;
}
.swiper__navg {
  display: flex;
  justify-content: center;
  color: #333 !important;
}
.arrow {
  padding-right: 15px;
}
.swiper__navg div {
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 7px;
  position: relative;
}
.swiper__navg div span {
  position: relative;
}
.tabs__list .swiper-buttontab-prev,
.tabs__list .swiper-buttontab-next {
  color: #ccae68;
  position: relative;
  margin-right: 15px;
  cursor: pointer;
  margin-left: 6px;
}

.tabs__list .swiper-buttontab-next span::before,
.tabs__list .swiper-buttontab-next span::after {
  border-right: 2px solid;
  content: "";
  display: block;
  height: 8px;
  margin-top: -6px;
  position: absolute;
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  right: 0;
  top: 50%;
  width: 0;
}
.tabs__list .swiper-buttontab-prev span::before,
.tabs__list .swiper-buttontab-prev span::after {
  border-right: 2px solid;
  content: "";
  display: block;
  height: 8px;
  margin-top: -6px;
  position: absolute;
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  right: 0;
  top: 50%;
  width: 0;
}
.tabs__list .swiper-buttontab-next span::after {
  margin-top: -1px;
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.tabs__list .swiper-buttontab-prev span::after {
  margin-top: -1px;
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(-45deg);
}
.swiper__navg .swiper-button-prev {
  background-color: #efefef;
  margin-right: 20px;
  padding: 15px;
}
.lefttab {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.left {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.swiper__navg .swiper-button-next span::before,
.swiper__navg .swiper-button-next span::after {
  border-right: 2px solid;
  content: "";
  display: block;
  height: 8px;
  margin-top: -6px;
  position: absolute;
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  right: 0;
  top: 50%;
  width: 0;
}
.swiper__navg .swiper-button-prev span::before,
.swiper__navg .swiper-button-prev span::after {
  border-right: 2px solid;
  content: "";
  display: block;
  height: 8px;
  margin-top: -6px;
  position: absolute;
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  right: 0;
  top: 50%;
  width: 0;
}
.swiper__navg .swiper-button-next span::after {
  margin-top: -1px;
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.swiper__navg .swiper-button-prev span::after {
  margin-top: -1px;
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.swiper__navg .swiper-button-next {
  background-color: #fff;
  padding: 15px;
}
.swiper-button-next,
.swiper-button-prev {
  position: unset;
  box-shadow: 0px 3px 6px -1px rgb(230, 230, 230);
  color: #333;
}
.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}
.swiper-button-next {
  right: unset;
  left: unset;
  width: unset;
  margin-top: unset;
}
.swiper-button-prev {
  left: unset;
  width: unset;
  margin-top: unset;
}
.card__item {
  background-color: #fff;
  text-align: left;
  /* display: flex; */
  color: #2b2d33;
  min-height: 127px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 6px -1px rgb(230, 230, 230);
}
.card__item span {
  font-size: 40px;
}
.card__item > p,
.card__item span small {
  font-size: 20px;
}
.card__item > p > span {
  color: #b9b9b9;
  font-size: 20px;
}
.sliders__wrapper {
  display: grid;
  padding: 20px;

  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
}
@media (max-width: 485px) {
  .sliders__wrapper {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
.tab__content-input {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  padding-top: 20px;
}
.tab__content-input p {
  color: #b9b9b9;
  font-weight: bold;
  margin-left: 5px;
}
input {
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  background: none;
  font-size: 16px;
  border-bottom: 1px solid #b9b9b9;
  text-align: right;
}
input:focus {
  outline: 0;
}
::-webkit-input-placeholder {
  text-align: right;
}
:-moz-placeholder {
  text-align: right;
}
.tabs__list {
  display: flex;
  align-items: center;
}

.scroll_right,
.scroll_left,
.btn {
  display: inline-block;
  border: none;
  text-decoration: none;
  background: transparent;
  color: #ccae68;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.btn:hover,
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.99);
}
.btn:not(:first-child) {
  margin-right: 10px;
}
.btn.activeTab {
  background: #002046;
}
.tabs__content {
  border: 1px solid #333;
  margin-top: 20px;
  padding: 20px;
}
.tab__header h2 {
  margin-bottom: 20px;
}
.tab__header {
  color: #000;
  text-align: left;
  background-color: #ffe782;
  padding: 20px 20px 0 20px;
}
</style>