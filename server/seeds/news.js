Meteor.startup(function() {


    if (News.find({})
        .count() === 0) {

        var sampleNews = [{
                index: 0,
                question: "Activist investor Phil Jackman believes the aging population and increasing healthcare product demand will be a significant catalyst in Valiant's future performance. Valiant's board has discussed the possibility to launch a major series of capital investments to set the platform for this future growth.",
                class: "Neutral",
                reason: "No materialization of the capital investments yet, not safe to invest right away",
                mu: 0.01,
                sigma: 0.01
            }, {
                index: 1,
                question: "With continuing focus of margin management, Couche Tard’s management is emphasizing cost control in which they hope to cut the COGS margin by 1.2%.  With an increased expansion into India on the horizon, management has revised its capital expenditures to increase by $2.5 billion in 2017 and 2018.",
                class: "Bearish",
                reason: "In your Discounted Cash Flow model, remember that an increase in capital expenditure will decrease your target price estimation. With only a 1.2% decrease in COGS margin, this will not be sufficient to offset the negative effect on your future cash flow",
                mu: -0.04,
                sigma: 0.02
            }, {
                index: 2,
                question: "The DOMINATOR program has underperformed management estimates in its first month. First-time sign-ups fell short of the 20,000 estimate by 5,000. However, management remains optimistic Q3 and Q4 results will reflect one full cycle of the value add from the program. ",
                class: "Bearish",
                reason: "This news will likely make Wall Street analysts drop their forecasts on sales growth, which is bad for your future cash flow.",
                mu: -0.02,
                sigma: 0.01
            }, {
                index: 3,
                question: "Due to the increasingly intense competition in the retail industry, Moody's revised the Aldo's credit rating to BB+, increasing credit spread by 2%.",
                class: "Bearish",
                reason: "Given that credit spreads affects the cost of debt in a firm, an increase in credit spreads wil increase the cost of debt of the firm, which will also increase the WACC, which then decreases the target price for Aldo.",
                mu: -0.01,
                sigma: 0.005
            }, {
                index: 4,
                question: "The OPEC agreed on modest oil output cuts from 33.3 million barrels per day to 32.5 million barrels per day.",
                class: "Bullish",
                reason: "This type of news are seen as speculations in the short-term, as no production cuts will be materialized until the deal goes through during the OPEC's official meeting. However, this news will be sufficient to push oil prices up in the short-term.",
                mu: 0.05,
                sigma: 0.02
            }, {
                index: 5,
                question: "Due to the continued fallout of oil prices, the U.S Federal Reserve revises CPI down by 50bps.",
                class: "Bearish",
                reason: "A decrease in inflation will have a negative impact on terminal growth rate, which will reduce the target price for equities.",
                mu: -0.03,
                sigma: 0.02
            }, {
                index: 6,
                question: "Stephen Poloz, Bank of Canada's governor, announced that Canadian trade exports are faced with 'lack of competitiveness' and housing resales are expected to slowdown in the next quarter. The BoC has also hinted that a rate cut likelihood will increase if exports face more headwinds in the foreseeable future.",
                class: "Neutral or Bearish",
                reason: "This is a tricky question. Although the BoC expressed bearish commentary on the Canadian Economy, nothing has been materialized yet. However, the rate cut commentary is very dangerous and could have an impact on the market on the short-term. Therefore, both neutral & bearish should be expected given the fact that no further details are included about the given economic situation.",
                mu: -0.01,
                sigma: 0.005
            }, {
                index: 7,
                question: "New technology shifts consumer demand away from Corsair's console segment, resulting in $1 billion decrease in EBIT.",
                class: "Bearish",
                reason: "A decrease in EBIT means the company suffers losses in the quarter. If this number is below estimates from Wall Street analysts, then the market will be expected to push the prices further down. In general, EBIT directly influence the firm's cash flow and a decrease in EBIT decreases future cash flow.",
                mu: -0.07,
                sigma: 0.04
            }, {
                index: 8,
                question: "Cineplex acquires assets in their theatre segment, increasing their assets by $3 billion.",
                class: "Neutral",
                reason: "Assets do not affect the outcome of a Discounted Cash Flow model and does not reflect on the company's ability to generate revenue",
                mu: 0.005,
                sigma: 0.005
            }, {
                index: 9,
                question: "The Bank of Japan’s recent quarterly report says, in effect, that the central bank has done all it can do to raise growth and inflation, and that fiscal policy needs to step in and help. The BOJ admitted that monetary policy alone won’t be enough to hit its 2 percent inflation target, now or ever",
                class: "Neutral",
                reason: "No materialization of the capital investments yet, not safe to invest right away ",
                mu: 0.01,
                sigma: 0.01
            }, {
                index: 10,
                question: "Russia's automotive market would shrink by 30 to 40 percent this year if it were not receiving state support, Russian news agencies quoted President Vladimir Putin as saying on Saturday.",
                class: "Bearish",
                reason: "Auto sales and consumptions are huge part of a nation's GDP, therefore a dramatic decrease in this sector will reduce GDP growth, thus reducing growth expectations.",
                mu: -0.019,
                sigma: -0.015
            }, {
                index: 11,
                question: "U.S. consumer sentiment rose more-than-expected last month, preliminary data showed on Friday. In a report, the University of Michigan said that consumer sentiment rose to a seasonally adjusted 91.6, from 87.2 in the preceding month. Analysts had expected UoM consumer sentiment to rise to 87.5 last month.",
                class: "Bullish",
                reason: "Consumer sentiment reported higher than expected, should expect a positive opening market",
                mu: 0.015,
                sigma: 0.01
            }, {
                index: 12,
                question: "Drilling activity in U.S. fields was little changed in this week's Baker Hughes survey, with oil rigs gaining by two to 452 and gas rigs falling by two to 115. The overall U.S. rig count, which also includes a loss of one miscellaneous rig, now totals 568. Total U.S. rigs are 26% lower than a year ago, oil rigs are down 21%, and gas rigs are off 40%.",
                class: "Bullish",
                reason: "",
                mu: 0.007,
                sigma: 0.007
            }, {
                index: 13,
                question: "In a report, Canadian Mortgage and Housing Corporation said that Canadian housing starts fell to a seasonally adjusted annual rate of 192.9K, from 219.4K in the preceding month whose figure was revised down from 220.6K. Analysts had expected Canadian housing starts to fall to 195.0K last month.",
                class: "Bearish",
                reason: "Slightly bearish as the result was slightly below analyst's expectation, but most of the info was already priced in",
                mu: -0.005,
                sigma: 0.005
            }, {
                index: 14,
                question: "On November 30th 2016, the OPEC meeting ended up not materializing production cut (previously hinted to be around 700k bpd). The scenario has been hinted by Russia and Iran 2 weeks prior to the meeting, as both countries were unlikely to go through with the deal.",
                class: "Bearish",
                reason: "Given the fact that this is not an unexpected news, most of the price actions should have been priced in. But there should be an oil price plunge right after the meeting.",
                mu: -0.03,
                sigma: 0.015
            }, {
                index: 15,
                question: "The British government has finalized their commitment to quit the EU union. Investors are rushing towards safe-heaven bonds among Canadian and U.S soverign bonds.",
                class: "Bearish",
                reason: "this would be similar to the aftermath effect of Brexit results, but not expected to be as dramatic. Yields across curves are expected to drop as bond prices rise due to high bids",
                mu: -0.02,
                sigma: 0.02
            }, {
                index: 16,
                question: "S&P has downgraded Canada's Alberta bond ratings from AA to A-",
                class: "Neutral",
                reason: "This should not have an immediate effect on the equity market side, though it will cause Alberta yield spreads to widen against well-performing provinces such as Ontario",
                mu: -0.002,
                sigma: 0.002
            }, {
                index: 17,
                question: "The entire population of Fort McMurray, about 90,000 people, was forced to flee nearly two weeks ago as the uncontrolled wildfire raged through some neighborhoods and destroyed about 15 percent of structures.  On Monday, the blaze continued to burn uncontrolled, now covering 285,000 hectares (704,000 acres), officials said. By Monday evening it was moving 30 to 40 meters (98 to 131 feet) every minute and had jumped a critical firebreak north of the city to push into the oil sand camp areas. ",
                class: "Bearish",
                reason: "Unexpected natural disaster on a massive scale and affecting Alberta's oil production, which is a huge part of their economy. Nonetheless, Canadian equity indexes are heavily concentrated with energy stocks.",
                mu: -0.03,
                sigma: 0.01
            }, {
                index: 18,
                question: "Pirate attack to Nigeria cargoes shipping crude oil barrels.",
                class: "Bullish",
                reason: "Short term speculative news as traders expect oil productions to be slown down, causing oil prices to appreciate",
                mu: 0.02,
                sigma: 0.015
            }, {
                index: 19,
                question: "The Chinese Manufacturing Index (PMI) just reported 51.2 YTD against a forecast of 70.2, dropping 20 pts from previous month.",
                class: "Bearish",
                reason: "huge discrepancy in outcome and forecast, this shows that China is slowing down and this will be bad for oil demand, leading other indexes to fall as well",
                mu: -0.03,
                sigma: 0.019
            }, {
                index: 20,
                question: "Bifinex, the third largest exchange for Bitcoin transactions, has just reported that 100M worth of Bitcoins were hacked.",
                class: "Neutral",
                reason: "Does not necessarily have to do with the state of our economy",
                mu: -0.001,
                sigma: 0.001
            }, {
                index: 21,
                question: "Almost two years after an unattended oil train derailed and exploded in Quebec, killing 47 people, the U.S. and Canadian governments jointly set new rules designed to reduce the risks of hauling crude by rail.",
                class: "Neutral",
                reason: "This is simply just a statement",
                mu: 0.001,
                sigma: 0.001
            }, {
                index: 22,
                question: "Osama Bin Laden has just been confirmed to be still alive through Al-Quaida's recent video posts. Location cannot be confirmed.",
                class: "Neutral",
                reason: "This has nothing to do with the economy, though reminding the aftermath of 911, this should still be a bearish event, though not very extreme",
                mu: -0.004,
                sigma: 0.005
            }, {
                index: 23,
                question: "The Federal Reserves has just announced that they will hike rates by 25bps, inline with expectations and futures market probability estimates",
                class: "Bullish",
                reason: "",
                mu: 0.01,
                sigma: 0.01
            },

        ];
        // loop over each sample poll and insert into database
        _.each(sampleNews, function(news) {
            News.insert(news);
        });

    }

});
