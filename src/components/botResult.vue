<template>
  <div class="trading-bot-results">
    <div class="title-section">
      <div class="divider">===========================================================</div>
      <div class="main-title">TRADING BOT RESULTS SUMMARY</div>
      <div class="divider">===========================================================</div>
      <div class="date">Date: {{ currentDate }}</div>
    </div>

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
            >{{ index + 1 }}. Order: {{ order[0] }} &emsp; &emsp; Duration:
            {{ convertSeconds(order[1]) }}</span
          >
          <span class="param-value"></span>
        </div>
      </div>
      <div class="subsection">
        <div class="subsection-title">Last cycle:</div>
        <div class="parameter">
          <span class="param-label"> Order: {{ botData.lastCycleBehavior[0] }}</span>
          <span class="param-value"
            >Duration: {{ convertSeconds(botData.lastCycleBehavior[1]) }}</span
          >
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

      <div class="subsection">
        <div class="subsection-title">EXTERNAL INDICATORS:</div>
        <div
          v-for="(value, indicator) in botData.dataFeed?.indicators"
          :key="indicator"
          class="parameter"
        >
          <span class="param-label">{{ indicator }}:</span>
          <span class="param-value">{{ value }}</span>
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
  computed: {
    currentDate() {
      console.log(this.botData, 'inside the loop')
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
  },
}
</script>

<style scoped>
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
</style>
