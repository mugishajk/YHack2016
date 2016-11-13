// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (News.find().count() === 0) {

    //LOAD EVERYTIME

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

  // if there are no polls available create sample data
  if (Questions.find().count() === 0) {
    //LOAD EVERYTIME

    // create sample polls
    var sampleQuestions = [
      {
        index: 0,
        question: "As the likelihood of a rate hike(increase) by the U.S Federal Reserve is increasing, would you increase your duration exposures in bonds or not?",
        choices: ["yes","no"],
        answer: 1,
        reason: "At this rate, yields across all maturities for bonds is expected to increase. If you increase your duration exposures in bonds, your holdings will be more sensitive to huge moves in the yield curve and you will be losing more than having less duration exposures. Remember your duration formula.. "
      },
      {
        index: 1,
        question: "In Canada, the Province of Alberta and Saskatchewan rely heavily on oil production, as it plays a huge part in their economy. If you are expecting an oil rally in the foreseeable future and you see that the bond yields in these provinces are trading at 20 bps above the Ontario yields (a province that performs well), will you be buying more Alberta & Saskatchewan bonds or not?",
        choices: ["yes","no"],
        answer: 0,
        reason: "You should increase your exposures to Alberta & Saskatchewan bonds if you expect oil prices to increase in the near future. Having exposures in these bonds under these circumstances will allow you to gain value as their yield spreads against Ontario to decrease once oil prices rally. Remember, yields and bond prices have an inverse relationship!"
      },
      {
        index: 2,
        question: "On November 8th 2016, after the market has already priced in a Clinton election victory, the election results show that Donald Trump is 2% ahead of Clinton. Would you expect the equities futures market to outperform?",
        choices: ["yes","no"],
        answer: 1,
        reason: "A Trump victory can be considered as a Black-Swan event that was not anticipated by the majority of the market players. His economic proposals are seen as risky and negative for most traders, so we would expect the futures market to drop.."
      },
      {
        index: 3,
        question: "Two companies are identical in earnings, growth prospects, leverage, returns on capital, and risk. Company A is trading at a 15 P/E multiple, while the other trades at 10 P/E. which would you prefer as an investment?",
        choices: ["15 P/E","10 P/E"],
        answer: 1,
        reason: "Given that all other aspects of the companies are very similar, the buyer should consider the 10 P/E alternative as the person can pay less per unit of ownership"
      },
      {
        index: 4,
        question: "When should you value a company by DCF using revenue multiples instead of EBITDA multiples?",
        choices: [ "When the firm has just recently launched its IPO. When the firm is in the consumer staples industry.",
                "When the firm has a low growth rate and high discount rate.",
                "When the firm has negative earnings.",
                "when the company has negative earnings"
        ],
        answer: "3",
        reason: "This is because negative earnings will result in negative EBITDA, which is meaningless when it comes to estimating the target price by the presevent value of negative sums. Instead, the firm is still likely to generate positive revenue given negative earnings, so using revenue multiples would be a better alternative."
      },
      {
        index: 5,
        question: "The Consumer Confidence Index just reported that it has gone up by 0.5% YTD, which was beyond Wall Street's expectations. Capital Expenditures for firm A went up by $20M in forward year 1 and year 2. In addition, growth for the industry has been revised and downgraded by 0.2%. Do you think the target price using the DCF model is expected to increase or decrease?",
        choices: ["Increase","Decrease"],
        answer: 1,
        reason: "The $20M Capex increase in both year 1 and year 2 is enough to offset the positive gain from inflationary pressure. In addition, growth forecasts are down, which is also against growth in CPI"
      },
      {
        index: 6,
        question: "How long does it take for $856 to grow into $1,122 at 7%",
        choices: ["3.5 years","4 years","4.5 years"],
        answer: 1,
        reason: "apply the formula: FV = PV*(1+r)^n where 1122=856*(1.07)^n, solve n by logarithms"
      },  
      {
        index: 7,
        question: "Determinants of Interest Rate for Individual Securities The Wall Street Journal reports that the current rate on 10-year Treasury bonds is 5.35 percent, on 20-year Treasury bonds is 5.75 percent, and on a 20-year corporate bond is 6.25 percent. Assume that the maturity risk premium is zero. If the default risk premium and liquidity risk premium on a 10-year corporate bond is the same as that on the 20-year corporate bond, what is the current rate on a 10-year corporate bond.",
        choices: ["5.65%","5.85%","6%"],
        answer: 1,
        reason: "The spread between the 20Y Corporate and Treasury is at 0.5%. Since the question stated that the premiums on a 10Y Corporate is the same as the 20Y Corporate, then all you have to do is add 0.5% to the 10Y Treasury Yields."
      }, 
      {
        index: 8,
        question: "This is the continual increase in the price level of a basket of goods and services.",
        choices: ["Inflation","Deflation"],
        answer: 0,
        reason: "Based on the definition of inflation, which measures the rise in prices among goods and services such as in foods and gasoline."
      },
      {
        index: 9,
        question: "The duration of a coupon-paying bond is a function of the bond's",
        choices: ["All of the above","None of the above"],
        answer: 0,
        reason: "The calculation of a bond's duration depends on the factors mentioned in the question."
      }, 
      {
        index: 10,
        question: "Given that the market is currently pricing a December rate hike at 84% likelihood based on prices in the futures market, would you consider buying a 10Y bond that yields 2% or a 15Y bond that yields 4% right now?",
        choices: ["10Y Bond","15Y Bond"],
        answer: 0,
        reason: "Since the likelihood of a rate hike is very high, yields across maturities are expected to widen at least before the December meetings. This means that holding a shorter-maturity bond will limit the buyer's duration exposure compared to a longer maturity bond. Remember, longer durations are more sensitive to interest rate changes."
      }, 
      {
        index: 11,
        question: "Holding other bond factors constant, the interest-rate risk of a coupon bond is lower when the bond's:",
        choices: ["Term to maturity is higher","Coupon rate is lower", "Yield to maturity is higher", "A and B", "All of the above"],
        answer: 2,
        reason: "The longer the maturity, the greater the interest-rate risk. The lower the coupon rate, the greater the interest-rate risk. The lower the yield to maturity, the greater the interest-rate risk. These concepts are reflected in the duration rules where duration is a measure of bond price sensitivity to interest rate changes (interest-rate risk)."
      },
      {
        index: 12,
        question: "Holding other bond factors constant, the interest-rate risk of a coupon bond is lower when the bond's:",
        choices: ["Term to maturity is higher","Coupon rate is lower", "Yield to maturity is higher", "A and B", "All of the above"],
        answer: 4,
        reason: "The longer the maturity, the greater the interest-rate risk. The lower the coupon rate, the greater the interest-rate risk. The lower the yield to maturity, the greater the interest-rate risk. These concepts are reflected in the duration rules where duration is a measure of bond price sensitivity to interest rate changes (interest-rate risk)."
      }, 
      {
        index: 13,
        question: "Holding other bond factors constant, the interest-rate risk of a coupon bond is higher when the bond's:",
        choices: ["Term to maturity is higher","Coupon rate is lower", "Yield to maturity is higher", "A and B", "All of the above"],
        answer: 1,
        reason: "The longer the maturity, the greater the interest-rate risk. The lower the coupon rate, the greater the interest-rate risk. The lower the yield to maturity, the greater the interest-rate risk. These concepts are reflected in the duration rules where duration is a measure of bond price sensitivity to interest rate changes (interest-rate risk)."
      },  
      {
        index: 14,
        question: "Holding other bond factors constant, the interest-rate risk of a coupon bond is higher when the bond's:",
        choices: ["Term to maturity is higher","Coupon rate is lower", "Yield to maturity is higher", "A and B", "All of the above"],
        answer: 0,
        reason: "The longer the maturity, the greater the interest-rate risk. The lower the coupon rate, the greater the interest-rate risk. The lower the yield to maturity, the greater the interest-rate risk. These concepts are reflected in the duration rules where duration is a measure of bond price sensitivity to interest rate changes (interest-rate risk)."
      },  
      {
        index: 15,
        question: "Duration can be defined as:",
        choices: ["assesses the time element of bonds in terms of both coupon and term to maturity","allows structuring a portfolio to avoid interest-rate risk", "is a direct comparison between bond issues with different level of risk", "A and B", "A and C"],
        answer: 3,
        reason: "Duration is a weighted average of when the cash flows of a bond are received; thus both coupon and time to maturity are considered. If the duration of the portfolio equals the investor's horizon date, the investor is protected against interest rate changes."
      },  
      {
        index: 16,
        question: "Which of the following bond has the longest duration?",
        choices: ["a 14Y bond paying no coupon", "a 14Y bond paying 8% coupon", "a 14Y bond paying 9% coupon", "a 13Y bond paying 9% coupon"],
        answer: 1,
        reason: "Longer the maturity and lower the coupon, the greater the duration"
      },   
      {
        index: 17,
        question: "A 10%, 30-year corporate bond was recently being priced to yield 12%. The Macaulay duration for the bond is 11.3 years. Given this information, the bond's modified duration would be",
        choices: ["8", "9.56", "10.09", "10.29"],
        answer: 2,
        reason: "Based on the formula, Modified duration = Macaulay Duration/(1+yield) = 10.09"
      },
      {
        index: 18,
        question: "Which of the following should NOT be excluded from past cash flow estimates when developing forecasts of future cash flows?",
        choices: ["a) Income from cash and marketable securities", "b) Income from holdings in other firms", "c) Non-recurring and one-time expenses", "d) Expenses associated with executive compensation e) All of the above items should be excluded"],
        answer: 2,
        reason: "In order to get a true gauge of a company's operating performance, one-time items are usually excluded by analysts and investors while evaluating a company. "
      },
      {
        index: 19,
        question: "Which of the following is NOT an advantage of relative valuation as compared to discounted cash flow valuation?",
        choices: ["a) Relative valuation is unaffected by assumptions such as growth and ROE", "b) Relative valuation can be used even when cash flows are negative", "c) Relative valuation will incorporate current market perceptions", "d) Relative valuation will always identify under and over-valued securities"],
        answer: 0,
        reason: "For instance, if you are using EBITDA exit multiple method, growth is still contributing in the forward multiples of EBITDA. Therefore, this is the wrong answer."
      },  
      {
        index: 20,
        question: "As the discount rate increases, the value of an asset increases",
        choices: ["true","false"],
        answer: 1,
        reason: "The reverse is true. Always remember the future value formula given by FV = PV(1+r)^n"
      }, 
      {
        index: 21,
        question: "As the expected growth rate in cash flows increases, the value of an asset increases.",
        choices: ["true","false"],
        answer: 0,
        reason: "The value of an asset is an increasing function of its cash flows."
      }, 
      {
        index: 22,
        question: "As the life of an asset is lengthened, the value of that asset increases.",
        choices: ["true","false"],
        answer: 0,
        reason: "The value of an asset is an increasing function of its cash flows."
      },
      {
        index: 23,
        question: "As the life of an asset is lengthened, the value of that asset increases.",
        choices: ["true","false"],
        answer: 1,
        reason: "The value of an asset is an increasing function of its life."
      },
      {
        index: 24,
        question: "An asset with an infinite life (i.e., it is expected to last forever) will have an infinite value.",
        choices: ["true","false"],
        answer: 1,
        reason: "The present value effect will translate the value of an asset from infinite to finite terms."
      },
      {
        index: 25,
        question: "While the general concepts of investment value and market value arevery similar, there is an important distinction between the two. All of thefollowing statements regarding investment value are true EXCEPT:",
        choices: ["A. Investment value is based on the expectations of a typical, or average,investor.", "B. Investment value is a function of estimated cash flows from annualoperations", "C. Investment value takes into consideration estimated proceeds from thesale of the property ", "D. Investment value applies a discount rate to futurecash flows"],
        answer: 0,
        reason: "Investment value is defined as the market value of a financial instrument, not purely out of expectations"
      },
      {
        index: 26,
        question: "Which of the following activities can increase cash flow from investing activities?",
        choices: ["A. Purchasing production equipment with cash. ", "B. Selling products and receiving cash. ", "C. Paying out cash dividends. ", "D. Selling an office building and receiving cash."],
        answer: 3,
        reason: "Usually fixed asset such as buildings cost more, so the cash generated from selling this item is more than from selling products"
      },
      {
        index: 27,
        question: "When valuing a company using the DCF model, we could calculate the terminal value by using two methods: the exit multiple method and the Gordon growth method.",
        choices: ["true", "false"],
        answer: 0,
        reason: "Using EBITDA exit multiple method and perpetuity growth method, exactly what has been taught to you!"
      },
      {
        index: 28,
        question: "When valuing a company using the DCF model, we could calculate the terminal value by using two methods: the exit multiple method and the Gordon growth method.",
        choices: ["true", "false"],
        answer: 1,
        reason: "Terminal Value = Final Projected Year FCF * (1+growth rate)/(discount rate – growth rate)"
      }
    ];

    // loop over each sample poll and insert into database
    _.each(sampleQuestions, function(question) {
      Questions.insert(question);
    });
  }
});
