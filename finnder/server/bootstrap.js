// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (News.find().count() === 0) {

    // create sample polls
    var sampleNews = [
      {
        index: 0,
        question: "Activist investor Phil Jackman believes the aging population and increasing healthcare product demand will be a significant catalyst in Valiant's future performance. Valiant's board has discussed the possibility to launch a major series of capital investments to set the platform for this future growth.",
        class: "Neutral",
        reason: "No materialization of the capital investments yet, not safe to invest right away",
        mu: 0.01,
        sigma: 0.01
      },
      {
        index: 1,
        question: "With continuing focus of margin management, Couche Tard’s management is emphasizing cost control in which they hope to cut the COGS margin by 1.2%.  With an increased expansion into India on the horizon, management has revised its capital expenditures to increase by $2.5 billion in 2017 and 2018.",
        class: "Bearish",
        reason: "In your Discounted Cash Flow model, remember that an increase in capital expenditure will decrease your target price estimation. With only a 1.2% decrease in COGS margin, this will not be sufficient to offset the negative effect on your future cash flow",
        mu: -0.04,
        sigma: 0.02
      },
      {
        index: 2,
        question: "The DOMINATOR program has underperformed management estimates in its first month. First-time sign-ups fell short of the 20,000 estimate by 5,000. However, management remains optimistic Q3 and Q4 results will reflect one full cycle of the value add from the program. ",
        class: "Bearish",
        reason: "This news will likely make Wall Street analysts drop their forecasts on sales growth, which is bad for your future cash flow.",
        mu: -0.02,
        sigma: 0.01 
      }, 
      {
        index: 3,
        question: "Due to the increasingly intense competition in the retail industry, Moody's revised the Aldo's credit rating to BB+, increasing credit spread by 2%.",
        class: "Bearish",
        reason: "Given that credit spreads affects the cost of debt in a firm, an increase in credit spreads wil increase the cost of debt of the firm, which will also increase the WACC, which then decreases the target price for Aldo.",
        mu: -0.01,
        sigma: 0.005
      },
      {
        index: 4,
        question: "The OPEC agreed on modest oil output cuts from 33.3 million barrels per day to 32.5 million barrels per day.",
        class: "Bullish",
        reason: "This type of news are seen as speculations in the short-term, as no production cuts will be materialized until the deal goes through during the OPEC's official meeting. However, this news will be sufficient to push oil prices up in the short-term.",
        mu: 0.05,
        sigma: 0.02
      }, 
      {
        index: 5,
        question: "Due to the continued fallout of oil prices, the U.S Federal Reserve revises CPI down by 50bps.",
        class: "Bearish",
        reason: "A decrease in inflation will have a negative impact on terminal growth rate, which will reduce the target price for equities.",
        mu: -0.03,
        sigma: 0.02
      },
      {
        index: 6,
        question: "Stephen Poloz, Bank of Canada's governor, announced that Canadian trade exports are faced with 'lack of competitiveness' and housing resales are expected to slowdown in the next quarter. The BoC has also hinted that a rate cut likelihood will increase if exports face more headwinds in the foreseeable future.",
        class: "Neutral or Bearish",
        reason: "This is a tricky question. Although the BoC expressed bearish commentary on the Canadian Economy, nothing has been materialized yet. However, the rate cut commentary is very dangerous and could have an impact on the market on the short-term. Therefore, both neutral & bearish should be expected given the fact that no further details are included about the given economic situation.",
        mu: -0.01,
        sigma: 0.005
      },
      {
        index: 7,
        question: "New technology shifts consumer demand away from Corsair's console segment, resulting in $1 billion decrease in EBIT.",
        class: "Bearish",
        reason: "A decrease in EBIT means the company suffers losses in the quarter. If this number is below estimates from Wall Street analysts, then the market will be expected to push the prices further down. In general, EBIT directly influence the firm's cash flow and a decrease in EBIT decreases future cash flow.",
        mu: -0.07,
        sigma: 0.04
      },
      {
        index: 8,
        question: "Cineplex acquires assets in their theatre segment, increasing their assets by $3 billion.",
        class: "Neutral",
        reason: "Assets do not affect the outcome of a Discounted Cash Flow model and does not reflect on the company's ability to generate revenue",
        mu: 0.005,
        sigma: 0.005
      }   
    ];

    // loop over each sample poll and insert into database
    _.each(sampleNews, function(news) {
      News.insert(news);
    });

  }

});