<template>
  <div class="trading-bot-results">
    <div class="title-section">
      <div class="divider">===========================================================</div>
      <div class="main-title">TRADING BOT RESULTS SUMMARY</div>
      <div class="divider">===========================================================</div>
      <div class="date">Date: {{ currentDate }}</div>
    </div>

    <!-- Layout with two columns -->
    <div class="dual-column-layout">
      <!-- Left Column -->
      <div class="column">
        <div class="section">
          <div class="section-header">
            <div class="divider">---------------------</div>
            <div class="section-title">CONFIGURATION</div>
            <div class="divider">---------------------</div>
          </div>

          <div class="subsection">
            <div class="subsection-title">Trading Period:</div>
            <div class="parameter">
              <span class="param-label">Start Date:</span>
              <span class="param-value">{{ botData.settings.StartDate }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">End Date:</span>
              <span class="param-value">{{ botData.settings.EndDate }}</span>
            </div>
          </div>

          <div class="subsection">
            <div class="subsection-title">Trading Parameters:</div>
            <div class="parameter">
              <span class="param-label">Symbol:</span>
              <span class="param-value">{{ botData.settings.Symbol }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Position:</span>
              <span class="param-value">{{ botData.settings.Pos }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Leverage:</span>
              <span class="param-value">{{ botData.settings.Lever }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Price Step:</span>
              <span class="param-value">{{ botData.settings.PriceStep }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">TP Level:</span>
              <span class="param-value">{{ botData.settings.TpLevel }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Order Amount:</span>
              <span class="param-value">{{ botData.settings.OrderAmount }}</span>
            </div>
          </div>

          <div class="subsection">
            <div class="subsection-title">Margin Settings:</div>
            <div class="parameter">
              <span class="param-label">Initial Margin:</span>
              <span class="param-value">{{ botData.settings.MargeI }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Margin Step:</span>
              <span class="param-value">{{ botData.settings.MargeS }}</span>
            </div>
          </div>

          <div class="subsection">
            <div class="subsection-title">Order Settings:</div>
            <div class="parameter">
              <span class="param-label">Multiplier Step:</span>
              <span class="param-value">{{ botData.settings.MultStep }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Amount Multiplier:</span>
              <span class="param-value">{{ botData.settings.MultAmount }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Additional Margin:</span>
              <span class="param-value">{{ botData.settings.MargeSupp }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="column">
        <!-- New Bot Process Duration Section -->
        <div class="section">
          <div class="section-header">
            <div class="divider">---------------------</div>
            <div class="section-title">BOT PROCESS DURATION</div>
            <div class="divider">---------------------</div>
          </div>

          <div class="subsection">
            <div class="subsection-title">Process Timings:</div>
            <div class="parameter">
              <span class="param-label">DB Connection:</span>
              <span class="param-value"
                >{{ botData.BotPhaseDurations?.DbConnection / 1000000000 || 'N/A' }} s</span
              >
            </div>
            <div class="parameter">
              <span class="param-label">DB Upload:</span>
              <span class="param-value"
                >{{ botData.BotPhaseDurations?.DbUpload / 1000000000 || 'N/A' }} s</span
              >
            </div>
            <div class="parameter">
              <span class="param-label">Bot Work:</span>
              <span class="param-value"
                >{{ botData.BotPhaseDurations?.BotWork / 1000000000 || 'N/A' }} s</span
              >
            </div>
            <div class="parameter">
              <span class="param-label">Bot Extra Work:</span>
              <span class="param-value"
                >{{ botData.BotPhaseDurations?.BotExtraWork / 1000000000 || 'N/A' }} s</span
              >
            </div>
            <div class="parameter">
              <span class="param-label">Total Duration:</span>
              <span class="param-value"
                >{{ botData.BotPhaseDurations?.BotTotalWork / 1000000000 }} s</span
              >
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="divider">---------------------</div>
            <div class="section-title">PERFORMANCE</div>
            <div class="divider">---------------------</div>
          </div>

          <div class="subsection">
            <div class="subsection-title">CYCLE STATISTICS:</div>
            <div class="parameter">
              <span class="param-label">Total Cycles:</span>
              <span class="param-value">{{ botData.cycleAmount || 'N/A' }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Total Profit:</span>
              <span class="param-value">{{ botData.botProfit || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div class="divider">---------------------</div>
            <div class="section-title">LIQUIDATION ANALYSIS</div>
            <div class="divider">---------------------</div>
          </div>

          <div class="subsection">
            <div class="subsection-title">LIQUIDATION STATUS:</div>
            <div class="parameter">
              <span class="param-label">Has Liquidated:</span>
              <span class="param-value" :class="botData.hasLiquidated ? 'danger' : 'success'">
                {{ botData.hasLiquidated ? 'YES' : 'NO' }}
              </span>
            </div>

            <div class="parameter" v-if="botData.hasLiquidated">
              <span class="param-label">Liquidation Date:</span>
              <span class="param-value danger">{{ botData.dateLiquidation || 'N/A' }}</span>
            </div>
          </div>

          <div class="subsection">
            <div class="subsection-title">LIQUIDATION PROXIMITY:</div>
            <div class="parameter">
              <span class="param-label">Closest Point to Liquidation:</span>
              <span class="param-value">{{
                Math.round(botData.closestToLiq, 2) ? Math.round(botData.closestToLiq, 2) : 'N/A'
              }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Date of Closest Point:</span>
              <span class="param-value">{{ botData.dateClosestToLiq || 'N/A' }}</span>
            </div>
            <div class="parameter">
              <span class="param-label">Average Liquidation Proximity:</span>
              <span class="param-value">{{
                botData.avgLiquidationProximity ? botData.avgLiquidationProximity + '%' : 'N/A'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-width sections -->
    <div class="section">
      <div class="section-header">
        <div class="divider">---------------------</div>
        <div class="section-title">ORDER DISTRIBUTION</div>
        <div class="divider">---------------------</div>
      </div>

      <div class="subsection">
        <div class="subsection-title">Orders by Depth Level:</div>
        <div v-for="(amount, order) in botData.cycleStats" :key="order" class="parameter">
          <span class="param-label">order {{ order }}:</span>
          <span class="param-value">{{ amount }} cycles</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="divider">---------------------</div>
        <div class="section-title">LONGEST DURATION ORDERS</div>
        <div class="divider">---------------------</div>
      </div>

      <div class="subsection">
        <div class="subsection-title">TOP 10 LONGEST ACTIVE ORDERS:</div>
        <div v-for="(order, index) in botData.longestCycles" :key="index" class="parameter">
          <span class="param-label"
            >{{ index + 1 }}. Order: {{ order[1] }} &emsp; &emsp; Duration:
            {{ convertSeconds(order[2]) }}</span
          ><span class="param-value"
            >&emsp; &emsp;&emsp; &emsp; {{ convertTimestamptoTime(order[0]) }}</span
          >
          <span class="param-value"></span>
        </div>
      </div>
      <div class="subsection">
        <div class="subsection-title">Last cycle:</div>
        <div class="parameter">
          <span class="param-label"> Order: {{ botData.lastCycleBehavior[1] }}</span>
          <span class="param-value"
            >Duration: {{ convertSeconds(botData.lastCycleBehavior[2]) }}</span
          >
        </div>

        <div>
          <!-- Title (as in your original example) -->
          <div class="subsection-title">
            Last cycle Data
            <!-- Optional: Display raw JSON for debugging/reference -->
            <!-- <span>{{ botData.lastCycleTable }}</span> -->
          </div>

          <!-- Check if data exists before trying to display it -->
          <div class="last-cycle-container">
            <!-- Summary Section for Single Values -->
            <div class="summary-section">
              <h4>Cycle Summary</h4>
              <ul>
                <li>
                  <strong>Opening Price:</strong>
                  {{ formatNumber(botData.lastCycleTable.OpeningPrice) }}
                </li>
                <li>
                  <strong>Total Position Margin:</strong>
                  {{ formatNumber(botData.lastCycleTable.PositionTotalMargin) }}
                </li>
                <li>
                  <strong>Final Liquidation Level:</strong>
                  {{ formatNumber(botData.lastCycleTable.LiqLevel) }}
                </li>
                <li>
                  <strong>Order Count Reached Max?:</strong>
                  {{ botData.lastCycleTable.HitMaxOrder ? 'Yes' : 'No' }}
                </li>
                <li><strong>Duration (seconds):</strong> {{ botData.lastCycleTable.Duration }}</li>
                <!-- Add Order and CurrentPos if they are meaningful summary stats -->
                <li><strong>Order Index (at end?):</strong> {{ botData.lastCycleTable.Order }}</li>
                <li>
                  <strong>Current Position (at end?):</strong>
                  {{ botData.lastCycleTable.CurrentPos }}
                </li>
              </ul>
            </div>

            <!-- Main Table for Array Data -->
            <div class="table-section">
              <h4>Order Details</h4>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Take Price</th>
                    <th>TP Price</th>
                    <th>Profit Per Order</th>
                    <th>Medium Price</th>
                    <th>Position Liq Lvl</th>
                    <th>Cumulative Buy BTC</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Iterate through one of the arrays to get the index -->
                  <!-- Assumes all arrays have the same length -->
                  <tr
                    v-for="(priceTake, index) in botData.lastCycleTable.PriceTakeOrder"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatNumber(priceTake) }}</td>
                    <td>{{ formatNumber(botData.lastCycleTable.PriceTpOrder[index]) }}</td>
                    <td>{{ formatNumber(botData.lastCycleTable.ProfitPerOrder[index], 5) }}</td>
                    <!-- More decimals for profit -->
                    <td>{{ formatNumber(botData.lastCycleTable.MediumPrice[index]) }}</td>
                    <td>{{ formatNumber(botData.lastCycleTable.PositionLiqLvl[index]) }}</td>
                    <td>{{ formatNumber(botData.lastCycleTable.CumulBuyBTC[index], 8) }}</td>
                    <!-- More decimals for BTC amount -->
                  </tr>
                </tbody>
              </table>
              <!-- Handle case where there are no orders -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="divider">---------------------</div>
        <div class="section-title">INCOMING DATA</div>
        <div class="divider">---------------------</div>
      </div>

      <div class="subsection">
        <div class="subsection-title">MARKET DATA FEED:</div>
        <div class="parameter">
          <span class="param-label">Data Provider:</span>
          <span class="param-value">{{ botData.dataFeed?.provider || 'N/A' }}</span>
        </div>
        <div class="parameter">
          <span class="param-label">Feed Status:</span>
          <span
            class="param-value"
            :class="botData.dataFeed?.status === 'Active' ? 'success' : 'warning'"
          >
            {{ botData.dataFeed?.status || 'N/A' }}
          </span>
        </div>
        <div class="parameter">
          <span class="param-label">Last Update:</span>
          <span class="param-value">{{ botData.dataFeed?.lastUpdate || 'N/A' }}</span>
        </div>
      </div>

      <div class="subsection">
        <div class="subsection-title">DATA METRICS:</div>
        <div class="parameter">
          <span class="param-label">Latency (avg):</span>
          <span class="param-value">{{
            botData.dataFeed?.avgLatency ? botData.dataFeed.avgLatency + 'ms' : 'N/A'
          }}</span>
        </div>
        <div class="parameter">
          <span class="param-label">Data Points:</span>
          <span class="param-value">{{ botData.dataFeed?.dataPoints || 'N/A' }}</span>
        </div>
        <div class="parameter">
          <span class="param-label">Error Rate:</span>
          <span
            class="param-value"
            :class="(botData.dataFeed?.errorRate || 0) > 1 ? 'warning' : 'success'"
          >
            {{ botData.dataFeed?.errorRate ? botData.dataFeed.errorRate + '%' : 'N/A' }}
          </span>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <div class="divider">---------------------</div>
          <div class="section-title">DAILY STATISTICS</div>
          <div class="divider">---------------------</div>
        </div>

        <div class="subsection">
          <div class="subsection-title">DAILY PERFORMANCE:</div>
          <!-- CSV Export Button -->
          <div class="csv-export">
            <button @click="copyDailyStatsAsCSV" class="csv-button">
              <span>Copy Daily Stats to CSV</span>
              <span v-if="copySuccess" class="copy-success">✓ Copied!</span>
            </button>
          </div>
          <div class="daily-stats-table">
            <div class="daily-stats-header">
              <div class="daily-stats-cell">Date</div>
              <div class="daily-stats-cell">Profit</div>
              <div class="daily-stats-cell">Cycles</div>
              <div class="daily-stats-cell">Highest order</div>
              <div class="daily-stats-cell">Cycle avrg</div>
              <div class="daily-stats-cell">Start</div>
              <div class="daily-stats-cell">Low</div>
              <div class="daily-stats-cell">High</div>
              <div class="daily-stats-cell">range</div>
            </div>
            <div v-for="(day, index) in botData.dailyStats" :key="index" class="daily-stats-row">
              <div class="daily-stats-cell">{{ unixToFormattedDate(day.Day - 86400 * 1000) }}</div>

              <div class="daily-stats-cell">
                {{ formatNumber(day.TempProfit, 2) }}
              </div>
              <div class="daily-stats-cell">{{ day.TempCycle }}</div>
              <div class="daily-stats-cell">{{ day.HighestOrder }}</div>
              <div class="daily-stats-cell">{{ formatNumber(day.CycleMed, 2) }}</div>
              <div class="daily-stats-cell" :class="getCellClass(day.RowStartTimestamp, index)">
                {{ formatNumber(day.RowStartTimestamp, 0) }}
              </div>
              <div class="daily-stats-cell">{{ formatNumber(day.RowMin, 0) }}</div>
              <div class="daily-stats-cell">{{ formatNumber(day.RowMax, 0) }}</div>
              <div class="daily-stats-cell">{{ formatNumber(day.interval, 1) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider">===========================================================</div>
  </div>
</template>
<script>
export default {
  name: 'TradingBotResults',

  props: {
    botData: {
      type: Object,
      required: false,
    },
    performanceData: {
      type: Object,
      default: () => ({ cycleAmount: 'N/A', botProfit: 'N/A' }),
    },
    orderDistribution: {
      type: Object,
      default: () => ({}),
    },
    longestOrders: {
      type: Array,
      default: () => [],
    },
    additionalMargin: {
      type: String,
      default: '0.00',
    },
  },
  data() {
    return {
      copySuccess: false,
    }
  },
  computed: {
    currentDate() {
      return new Date()
        .toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')
    },
  },
  methods: {
    convertSeconds(seconds) {
      const days = Math.floor(seconds / (24 * 3600))
      seconds %= 24 * 3600
      const hours = Math.floor(seconds / 3600)
      seconds %= 3600
      const minutes = Math.floor(seconds / 60)
      seconds %= 60

      return `${days}d ${hours}h ${minutes}m ${seconds}s`
    },

    formatNumber(value, precision) {
      // Check if value is null, undefined or not a number
      if (value === undefined || value === null || isNaN(value)) return 'N/A'

      // Handle both integers and floating point numbers
      // Converting to Number first ensures proper handling of numeric strings too
      const numValue = Number(value)
      return numValue.toFixed(precision)
    },

    unixToFormattedDate(unixTimestamp) {
      const date = new Date(unixTimestamp) // Convert to milliseconds
      const day = date.getDate()
      const month = date.toLocaleString('en-US', { month: 'short' })
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
      return `${dayOfWeek} ${day}-${day + 1} ${month}`
    },

    getCellClass(currentValue, index) {
      if (index === 0) return '' // No previous value for the first item

      const previousValue = this.botData.dailyStats[index - 1]?.RowStartTimestamp
      return currentValue > previousValue ? 'green-cell' : 'red-cell'
    },

    // New method to convert daily stats to CSV and copy to clipboard
    copyDailyStatsAsCSV() {
      if (
        !this.botData ||
        !this.botData.dailyStats ||
        !Array.isArray(this.botData.dailyStats) ||
        this.botData.dailyStats.length === 0
      ) {
        alert('No daily statistics data found')
        return
      }

      // Define headers for CSV
      const headers = [
        'Date',
        'Profit',
        'Cycles',
        'Highest_Order',
        'Cycle_Average',
        'Start_Price',
        'Low_Price',
        'High_Price',
        'Price_Range',
      ]

      // Create CSV header row
      let csvContent = headers.join(',') + '\n'

      // Process each day's data
      this.botData.dailyStats.forEach((day) => {
        // Format the date
        const date = this.unixToFormattedDate(day.Day - 86400 * 1000)

        // Create CSV row with all values
        const row = [
          `"${date}"`,
          this.formatNumber(day.TempProfit, 2),
          day.TempCycle,
          day.HighestOrder,
          this.formatNumber(day.CycleMed, 2),
          this.formatNumber(day.RowStartTimestamp, 0),
          this.formatNumber(day.RowMin, 0),
          this.formatNumber(day.RowMax, 0),
          this.formatNumber(day.interval, 1),
        ]

        csvContent += row.join(',') + '\n'
      })

      // Copy to clipboard
      this.copyToClipboard(csvContent)

      // Show success message
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 2000)
    },
    convertTimestamptoTime(unixTimestamp) {
      var d = new Date(unixTimestamp), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
        ampm = 'AM',
        time

      if (hh > 12) {
        h = hh - 12
        ampm = 'PM'
      } else if (hh === 12) {
        h = 12
        ampm = 'PM'
      } else if (hh == 0) {
        h = 12
      }

      // ie: 2014-03-24, 3:00 PM
      time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm
      return time
    },

    // Helper method to copy text to clipboard
    copyToClipboard(text) {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)

      // Select and copy the text
      textarea.select()
      document.execCommand('copy')

      // Remove the temporary element
      document.body.removeChild(textarea)
    },
  },
}
</script>
<style scoped>
.green-cell {
  background-color: rgb(81, 107, 81);
  color: white;
}

.red-cell {
  background-color: rgb(213, 99, 99);
  color: white;
}
.trading-bot-results {
  font-family: monospace;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  color: #f0f0f0;
  margin: 20px 0;
  overflow-x: auto;
  line-height: 1.5;
  font-size: 14px;
  white-space: pre-wrap;
}

/* New dual column layout */
.dual-column-layout {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.column {
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
}

.title-section {
  text-align: center;
  margin-bottom: 16px;
}

.main-title {
  font-weight: bold;
  font-size: 16px;
  padding: 4px 0;
}

.divider {
  color: #888;
}

.date {
  margin-top: 8px;
  color: #aaa;
}

.section {
  margin: 16px 0;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-weight: bold;
  padding: 4px 0;
}

.subsection {
  margin-left: 2px;
  margin-bottom: 12px;
}

.subsection-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.parameter {
  margin-left: 20px;
  display: flex;
}

.param-label {
  min-width: 160px;
  color: #aaa;
}

.param-value {
  color: #4fd1c5;
}

/* Daily stats table styles */
.daily-stats-table {
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.daily-stats-header {
  display: flex;
  background-color: #333;
  font-weight: bold;
  padding: 6px 0;
}

.daily-stats-row {
  display: flex;
  border-top: 1px solid #333;
  padding: 4px 0;
}

.daily-stats-row:nth-child(odd) {
  background-color: #252525;
}

.daily-stats-cell {
  flex: 1;
  padding: 2px 8px;
  text-align: right;
}

.daily-stats-cell:first-child {
  text-align: left;
  color: #aaa;
}

.profit {
  color: #4ade80;
}

.loss {
  color: #f87171;
}

.danger {
  color: #f87171;
}

.warning {
  color: #facc15;
}

.success {
  color: #4ade80;
}

/* CSV Export Button Styles */
.csv-export {
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-end;
}

.csv-button {
  background-color: #2a5b84;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-family: monospace;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.csv-button:hover {
  background-color: #3a6fa3;
}

.copy-success {
  margin-left: 8px;
  color: #4ade80;
  font-weight: bold;
}
.subsection-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #aaa;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.subsection-title span {
  font-weight: normal;
  font-size: 0.8em;
  color: #666;
  margin-left: 10px;
  /* Hide the raw data span by default if uncommented */
  /* display: none; */
}

.last-cycle-container {
  font-family: sans-serif;
  color: #aaa;
}

.summary-section {
  margin-bottom: 20px;
  padding: 15px;

  border: 1px solid #eee;
  color: #aaa;
  border-radius: 4px;
}

.summary-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.summary-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-section li {
  margin-bottom: 5px;
}

.summary-section strong {
  display: inline-block;
  min-width: 180px; /* Adjust as needed for alignment */
  color: #444;
}

.table-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #ece8e8;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: right; /* Align numbers to the right */
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center; /* Center headers */
}

/* First column (Order #) centered */
.data-table td:first-child {
  text-align: center;
}
</style>
