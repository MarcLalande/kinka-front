<script>
import BotResult from '@/components/botResult.vue'
import axios from 'axios'
const getDefaultConfig = () => ({
  name: '',
  interval: '',
  startDate: '',
  endDate: '',
  symbol: '',
  pos: 'LONG',
  lever: null,
  priceStep: null,
  tpLevel: null,
  margeI: 0.0,
  margeS: 0.0,
  orderAmount: null,
  multStep: null,
  multAmount: null,
})
export default {
  components: {
    BotResult,
  },
  data() {
    return {
      resultBotDetails: {},
      readyConfigs: {},
      isLoading: false,
      showConfig: false,
      selectedPreset: '',
      showResult: false,
      generatedConfig: '',

      fileContent: '',
      config: getDefaultConfig(),
    }
  },

  created() {
    console.log(Object.keys(this.resultBotDetails).length === 0)
    console.log(this.readyConfigs)
    this.getConfigs()
    console.log(this.readyConfigs)
  },
  methods: {
    getConfigs() {
      axios
        .get('http://localhost:3001/config', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          console.log(data.request.response)
          console.log(JSON.parse(data.request.response))
          this.readyConfigs = JSON.parse(data.request.response)
          console.log(`Received ${this.fileName} with content:`, this.c)
        })
        .catch((error) => {
          console.error('Error fetching file:', error)
        })
    },

    loadPreset() {
      console.log(this.selectedPreset)

      const selectedConfig = this.readyConfigs[this.selectedPreset]
      console.log(selectedConfig)
      this.config = {
        name: this.selectedPreset,
        interval: selectedConfig.Interval,
        startDate: selectedConfig.StartDate,
        endDate: selectedConfig.EndDate,
        symbol: selectedConfig.Symbol,
        pos: selectedConfig.Pos,
        lever: selectedConfig.Lever,
        priceStep: selectedConfig.PriceStep,
        tpLevel: selectedConfig.TpLevel,
        margeI: selectedConfig.MargeI,
        margeS: selectedConfig.MargeS,
        orderAmount: selectedConfig.OrderAmount,
        multStep: selectedConfig.MultStep,
        multAmount: selectedConfig.MultAmount,
      }
    },
    launchDetails() {
      this.resultBotDetails = {}
      this.fileContent = ''
      this.isLoading = true
      const api = 'http://localhost:3001/bot'
      const data = this.config
      console.log(data)
      axios
        .post(api, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response, 'flag')
          this.resultBotDetails = response.data.result
          console.log(this.resultBotDetails)
          this.isLoading = false
        })
        .catch((error) => {
          console.error('Error fetching file:', error)
          this.error = 'Failed to load file. Please try again.'
          this.isLoading = false
        })
    },
    saveConfig() {
      console.log(this.config)
      // Validate required fields
      if (!this.config.name) {
        alert('Please enter a configuration name')
        return
      }
      const data = this.config
      console.log('HELLO', data)
      axios
        .post('http://localhost:3001/config', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          console.log(data.request.response)
          console.log(JSON.parse(data.request.response))
          this.getConfigs()
        })
        .catch((error) => {
          console.error('Error fetching file:', error)
        })
      console.log('Configuration saved:', this.config)
    },
    removeConfig() {
      const data = this.config
      console.log('HELLOdelete', data)
      axios
        .delete('http://localhost:3001/config', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        })
        .then((data) => {
          console.log(data.request.response)
          this.showConfig = false
          this.config = getDefaultConfig()
          this.getConfigs()
        })
        .catch((error) => {
          console.error('Error fetching file:', error)
        })
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
  <div class="flex flex-col md:flex-row gap-4 p-4 min-h-screen mx-auto">
    <!-- Left Column: Configuration -->
    <div class="md:w-1/3 flex flex-col gap-4">
      <!-- Preset Selector Box -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-xl font-bold mb-4 text-white">Bot Configuration</h2>

        <!-- Preset Selector -->
        <div class="mb-4">
          <select
            v-model="selectedPreset"
            @change="loadPreset"
            class="w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option v-for="(value, key) in this.readyConfigs" :key="key">{{ key }}</option>
          </select>
        </div>

        <!-- Toggle Config Button -->

        <!-- Generated Config -->
        <div v-if="showResult" class="mt-4 p-4 bg-gray-900 rounded-md border border-gray-700">
          <h3 class="text-lg font-medium text-gray-200 mb-2">Generated Configuration:</h3>
          <pre class="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">{{
            generatedConfig
          }}</pre>
          <div class="mt-4 flex justify-end">
            <button
              @click="copyConfig"
              class="py-1 px-3 border border-transparent text-sm font-medium rounded-md text-indigo-200 bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>

        <!-- Launch Button -->
        <div class="pt-4">
          <button
            v-if="this.selectedPreset"
            @click="(launchDetails(), (isLoading = true))"
            class="w-full mt-4 flex justify-center items-center py-3 p-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Bot
          </button>
        </div>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg">
        <!-- Configuration Form Box -->
        <div class="flex items-center">
          <button
            @click="showConfig = !showConfig"
            class="w-full mt-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="
              showConfig ? 'bg-red-400 hover:bg-red-400' : 'bg-indigo-600 hover:bg-indigo-700'
            "
          >
            Edit config
          </button>
        </div>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg" v-if="config.name != ''">
        <!-- Configuration Form Box -->
        <div class="flex items-center">
          <button
            @click="removeConfig()"
            class="w-full mt-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="showConfig ? 'bg-red-400 hover:bg-red-400' : 'bg-red-600 hover:bg-red-700'"
          >
            Delete config
          </button>
        </div>
      </div>
      <div v-if="showConfig" class="bg-gray-800 p-4 rounded-lg">
        <!-- Save Config Button -->

        <form @submit.prevent="saveConfig" class="space-y-3">
          <div class="pt-4">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Configuration
            </button>
          </div>
          <!-- Configuration Name -->
          <div class="pt-4">
            <label class="block text-sm font-medium text-gray-300">Configuration Name</label>
            <input
              type="text"
              v-model="config.name"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="Enter a name for this configuration"
            />
          </div>

          <!-- Interval 
          <div>
            <label class="block text-sm font-medium text-gray-300">Interval</label>
            <input
              type="text"
              v-model="config.interval"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 1s, 1m, 5m"
            />
          </div>
-->
          <!-- Symbol -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Symbol</label>
            <input
              type="text"
              v-model="config.symbol"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., BTC, ETH"
            />
          </div>

          <!-- Start Date -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Start Date</label>
            <input
              type="text"
              v-model="config.startDate"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="YYYY,MM,DD,HH,MM,SS"
            />
          </div>

          <!-- End Date -->
          <div>
            <label class="block text-sm font-medium text-gray-300">End Date</label>
            <input
              type="text"
              v-model="config.endDate"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="YYYY,MM,DD,HH,MM,SS"
            />
          </div>

          <!-- Position -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Position</label>
            <select
              v-model="config.pos"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>

          <!-- Leverage -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Leverage</label>
            <input
              type="number"
              v-model.number="config.lever"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 8"
            />
          </div>

          <!-- Price Step -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Price Step</label>
            <input
              type="number"
              step="0.01"
              v-model.number="config.priceStep"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 0.35"
            />
          </div>

          <!-- Take Profit Level -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Take Profit Level</label>
            <input
              type="number"
              step="0.01"
              v-model.number="config.tpLevel"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 0.25"
            />
          </div>

          <!-- Margin Initial -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Margin Initial</label>
            <input
              v-model.number="config.margeI"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 58"
            />
          </div>

          <!-- Margin Safety -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Margin Safety</label>
            <input
              v-model.number="config.margeS"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 20"
            />
          </div>

          <!-- Order Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Order Amount</label>
            <input
              type="number"
              v-model.number="config.orderAmount"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 8"
            />
          </div>

          <!-- Multiplier Step -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Multiplier Step</label>
            <input
              type="number"
              step="0.01"
              v-model.number="config.multStep"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 1.08"
            />
          </div>

          <!-- Multiplier Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-300">Multiplier Amount</label>
            <input
              type="number"
              step="0.01"
              v-model.number="config.multAmount"
              class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-indigo-500"
              placeholder="e.g., 1.58"
            />
          </div>

          <div class="pt-4">
            <button
              @click="launchDetails()"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start with current configuration
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Column: Results -->
    <div class="md:w-2/3 bg-gray-800 p-4 rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-white">Results</h2>
        <button
          v-if="fileContent"
          @click="downloadResults"
          class="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Download Results
        </button>
      </div>
      <div class="bg-gray-800 p-4 rounded-lg" v-if="this.config.name == ''">
        <!-- Configuration Form Box -->
        <div class="flex items-center">
          <div
            class="w-full mt-4 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            No config selected
          </div>
        </div>
      </div>
      <BotResult
        v-if="Object.keys(this.resultBotDetails).length !== 0"
        :bot-data="this.resultBotDetails"
      ></BotResult>
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div
          class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <div v-else-if="!fileContent" class="flex justify-center items-center h-64 text-gray-400">
        <p>No results yet. Configure and launch the bot to see results here.</p>
      </div>
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
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
@import 'tailwindcss';
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
