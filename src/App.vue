<script>
export default {
  data() {
    return {
      showConfig: false,
      selectedPreset: '',
      showResult: false,
      generatedConfig: '',
      config: {
        name: '',
        interval: '',
        startDate: '',
        endDate: '',
        symbol: '',
        pos: 'LONG',
        lever: null,
        priceStep: null,
        tpLevel: null,
        margeI: null,
        margeS: null,
        orderAmount: null,
        multStep: null,
        multAmount: null,
      },
    }
  },
  methods: {
    loadPreset() {
      if (this.selectedPreset === 'btc-rv6m') {
        this.config = {
          name: 'BTC RV6M 8 1.3K 8X 3month',
          interval: '1s',
          startDate: '2024,12,01,00,00,00',
          endDate: '2025,03,01,00,00,00',
          symbol: 'BTC',
          pos: 'LONG',
          lever: 8,
          priceStep: 0.35,
          tpLevel: 0.25,
          margeI: 58,
          margeS: 20,
          orderAmount: 8,
          multStep: 1.08,
          multAmount: 1.58,
        }
      } else if (this.selectedPreset === 'custom') {
        this.config = {
          name: 'Custom Configuration',
          interval: '',
          startDate: '',
          endDate: '',
          symbol: '',
          pos: 'LONG',
          lever: null,
          priceStep: null,
          tpLevel: null,
          margeI: null,
          margeS: null,
          orderAmount: null,
          multStep: null,
          multAmount: null,
        }
      }
    },
    saveConfig() {
      // Validate required fields
      if (!this.config.name) {
        alert('Please enter a configuration name')
        return
      }

      // Generate the Go code for this configuration
      this.generatedConfig = `var botConfigs = map[string]botSettings{
    "${this.config.name}": {
        interval:    "${this.config.interval}",
        startDate:   "${this.config.startDate}",
        endDate:     "${this.config.endDate}",
        symbol:      "${this.config.symbol}",
        pos:         "${this.config.pos}",
        lever:       ${this.config.lever},
        priceStep:   ${this.config.priceStep},
        tpLevel:     ${this.config.tpLevel},
        margeI:      ${this.config.margeI},
        margeS:      ${this.config.margeS},
        orderAmount: ${this.config.orderAmount},
        multStep:    ${this.config.multStep},
        multAmount:  ${this.config.multAmount},
    },
}`

      this.showResult = true

      // In a real application, you would also send this to your backend
      console.log('Configuration saved:', this.config)
    },
    copyConfig() {
      navigator.clipboard
        .writeText(this.generatedConfig)
        .then(() => {
          alert('Configuration copied to clipboard!')
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
        })
    },
  },
}
</script>

<template>
  <div class="mr-3">
    <div
      class="m-7 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      Create Config
      <label class="switch">
        <input @click="showConfig = !showConfig" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
  <select
    v-model="selectedPreset"
    @change="loadPreset"
    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="">-- Select a preset --</option>
    <option value="btc-rv6m">BTC RV6M 8 1.3K 8X 3month</option>
    <option value="custom">Custom Configuration</option>
  </select>
  <button
    type="submit"
    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    LAUNCH DETAILS
  </button>
  <form @submit.prevent="saveConfig">
    <label class="block text-sm font-medium text-gray-700 d-flex">Load Preset Configuration</label>

    <!-- Configuration Name -->
    <div v-if="showConfig">
      <div class="">
        <label class="block text-sm font-medium text-gray-700">Configuration Name</label>
        <input
          type="text"
          v-model="config.name"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter a name for this configuration"
        />
      </div>

      <!-- Form grid for settings -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Interval -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Interval</label>
          <input
            type="text"
            v-model="config.interval"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 1s, 1m, 5m"
          />
        </div>

        <!-- Symbol -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Symbol</label>
          <input
            type="text"
            v-model="config.symbol"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., BTC, ETH"
          />
        </div>

        <!-- Start Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="text"
            v-model="config.startDate"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="YYYY,MM,DD,HH,MM,SS"
          />
        </div>

        <!-- End Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="text"
            v-model="config.endDate"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="YYYY,MM,DD,HH,MM,SS"
          />
        </div>

        <!-- Position -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Position</label>
          <select
            v-model="config.pos"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <!-- Leverage -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Leverage</label>
          <input
            type="number"
            v-model.number="config.lever"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 8"
          />
        </div>

        <!-- Price Step -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Price Step</label>
          <input
            type="number"
            step="0.01"
            v-model.number="config.priceStep"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 0.35"
          />
        </div>

        <!-- Take Profit Level -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Take Profit Level</label>
          <input
            type="number"
            step="0.01"
            v-model.number="config.tpLevel"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 0.25"
          />
        </div>

        <!-- Margin Initial -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Margin Initial</label>
          <input
            type="number"
            v-model.number="config.margeI"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 58"
          />
        </div>

        <!-- Margin Safety -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Margin Safety</label>
          <input
            type="number"
            v-model.number="config.margeS"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 20"
          />
        </div>

        <!-- Order Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Order Amount</label>
          <input
            type="number"
            v-model.number="config.orderAmount"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 8"
          />
        </div>

        <!-- Multiplier Step -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Multiplier Step</label>
          <input
            type="number"
            step="0.01"
            v-model.number="config.multStep"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 1.08"
          />
        </div>

        <!-- Multiplier Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Multiplier Amount</label>
          <input
            type="number"
            step="0.01"
            v-model.number="config.multAmount"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 1.58"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-8">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Configuration
        </button>
      </div>
    </div>
  </form>

  <!-- Results Section -->
  <div v-if="showResult" class="mt-8 p-4 bg-gray-50 rounded-md">
    <h2 class="text-lg font-medium text-gray-900 mb-2">Generated Configuration:</h2>
    <pre class="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">{{
      generatedConfig
    }}</pre>
    <div class="mt-4 flex justify-end">
      <button
        @click="copyConfig"
        class="py-1 px-3 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Copy to Clipboard
      </button>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@import 'tailwindcss';
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
