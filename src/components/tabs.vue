<template>
  <div>
    <div class="container">
      <div class="tab">
        <div class="tabs__wrapper">
          <div class="tab__header">
            <h2>Курс EUR сегодня</h2>

            <!-- <div class="tab__header-tabs"> -->
            <div class="tabs__list">
              <VueSlickCarousel v-bind="settings" v-if="getTabs.rates">
                <div v-for="(item, index) in getTabs.rates" :key="item.id">
                  <button
                    class="btn"
                    @click="selectTab(item.currency, index + 1)"
                  >
                    {{ item.currency }}
                  </button>
                </div>
                <template #prevArrow="arrowOption">
                  <div class="custom-arrow">
                    {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
                  </div>
                </template>
                /*...*/
                <template #customPaging="page">
                  <div class="custom-dot">
                    {{ page }}
                  </div>
                </template>
              </VueSlickCarousel>
            </div>

            <!-- </div> -->
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

            <VueSlickCarousel
              v-bind="settingscard"
              v-if="filterValue.length !== 0"
            >
              <div
                class="card__item"
                v-for="value in filterValue"
                :key="value.id"
              >
                {{
                  Math.round(value.value)
                    .toLocaleString("zh-ZH")
                    .split(",")
                    .join(" ")
                }}
                -
                {{ value.currency }}
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// VueSlick
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      currentTab: 1,
      baseCurrency: "",
      settings: {
        infinite: true,
        speed: 500,

        variableWidth: true,
        slidesToScroll: 1,
      },
      settingscard: {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        leftMode: true,
        leftPadding: "40px",
      },
      filterValue: [],
      currencyValue: "",
    };
  },
  components: {
    VueSlickCarousel,
  },
  async mounted() {
    await this.$store.dispatch("tabs");
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
    },
  },
  computed: {
    getTabs() {
      return this.$store.getters.getTabs;
    },
  },

  methods: {
    selectTab(currency, selectedTab) {
      this.currentTab = selectedTab;
      this.$store.dispatch("getBase", currency);
      this.currencyValue = "";
    },
    showNext() {
      this.$refs.carousel.next();
    },
  },
};
</script>

<style scoped>
.card__item {
  background-color: rgb(216, 191, 191) !important;
}
.card__item {
  background-color: thistle;
}
.tab__content-input {
  justify-content: flex-end;
  display: flex;
  align-items: center;
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
  border-bottom: 1px solid #000;
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

/* .tabs__list {
  margin: 30px 0;
} */
.scroll_right,
.scroll_left,
.btn {
  display: inline-block;
  border: none;
  /* padding: 10px; */
  margin: 0;
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
.btn:first-child {
  padding-left: 0;
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
.tab {
  background-color: #f4f4f4;
  padding: 30px;
}
.tabs__content {
  border: 1px solid #333;
  margin-top: 20px;
  padding: 20px;
}
.tab__header-tabs {
  /* display: flex; */
  /* margin: 0 20px; */
  /* overflow-y: scroll; */
}
.tab__header {
  color: #000;
  text-align: left;
  background-color: #ffe782;
  padding: 20px;
}
</style>
<style>
.slick-prev {
  left: 0px;
  background-color: #ffe782;
  z-index: 9;
}
.slick-prev:hover {
  background-color: #ffe782;
}
.slick-next {
  right: 0px;
  z-index: 9;
  background-color: #ffe782;
}
.slick-next:hover {
  background-color: #ffe782;
}
</style>