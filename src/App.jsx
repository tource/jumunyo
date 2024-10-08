import { Route, Routes } from "react-router-dom";
import Accept from "./components/admin/Accept";
import AcceptDetail from "./components/admin/AcceptDetail";
import Ask from "./components/admin/Ask";
import AskDetail from "./components/admin/AskDetail";
import CategorySetting from "./components/admin/CategorySetting";
import Report from "./components/admin/Report";
import ReportDetail from "./components/admin/ReportDetail";
import Home from "./components/ceo/Home";
import LoginPageforCEO from "./components/ceo/LogintestforCeo";
import OrdersAccepted from "./components/ceo/OrdersAccepted";
import OrdersDetail from "./components/ceo/OrdersDetail";
import OrdersHistory from "./components/ceo/OrdersHistory";
import Reviews from "./components/ceo/Reviews";
import Statistics from "./components/ceo/Statistics";
import StoreManagement from "./components/ceo/StoreManagement";
import AdminLayout from "./components/layout/AdminLayout";
import CeoLayout from "./components/layout/CeoLayout";
import RootLayout from "./components/layout/RootLayout";
import MyPageOrderCloseDetail from "./components/user/mypage/MyPageOrderCloseDetail";
import AuthCeoPage from "./pages/AuthCeoPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import AuthUserPage from "./pages/AuthUserPage.tsx";
import CeoPage from "./pages/CeoPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import MyPageAddress from "./pages/MyPageAddress";
import MyPageOrderClosePage from "./pages/MyPageOrderClosePage";
import MyPageOrderPage from "./pages/MyPageOrderPage.tsx";
import MyPageOrderPagee from "./pages/MyPageOrderPagee";
import MyPageReviewPage from "./pages/MyPageReviewPage";
import MypageReportPage from "./pages/MypageReportPage";
import MypageUserWithdrawal from "./pages/MypageUserWithdrawal";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProjectInfo from "./pages/ProjectInfo.jsx";
// import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import StatisticsforAdmin from "./components/admin/StatisticsforAdmin";
import CeoWithdrawal from "./components/ceo/CeoWithdrawal";
import MenuManagement from "./components/ceo/MenuManagement";
import StatisticsforCeo from "./components/ceo/StatisticsforCeo";
import MypageLayout from "./components/layout/MypageLayout";
import MyPageCouponPage from "./pages/MyPageCouponPage";
import MyPageFavoriteListPage from "./pages/MyPageFavoriteListPage";
import MyPageReportListPage from "./pages/MyPageReportListPage";
import MypageReportDetailPage from "./pages/MypageReportDetailPage";
import SnsLoginPage from "./pages/SnsLoginPage";
import IntroPage from "./pages/intro/IntroPage";
import { OrderProvider } from "./pages/user/OrderContext";
import RestaurantDetailPage2 from "./pages/user/RestaurantDetailPage2";
import RestaurantsPage from "./pages/user/main/RestaurantsPage";

function App() {
  return (
    <OrderProvider>
      <div className="root-wrap">
        <Routes>
          {/* 로그인 및 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth">
            <Route index element={<AuthPage />} />
            <Route path="user" element={<AuthUserPage />} />
            <Route path="ceo" element={<AuthCeoPage />} />
          </Route>
          <Route path="/oauth/redirect" element={<SnsLoginPage />} />

          {/* 유저 */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="restaurant/:id" element={<RestaurantsPage />} />
            <Route path="restaurants/:id" element={<RestaurantDetailPage2 />} />
            <Route path="payment/:id" element={<PaymentPage />} />
            <Route path="projectinfo" element={<ProjectInfo />} />
          </Route>

          {/* 마이페이지 */}
          <Route path="/" element={<MypageLayout />}>
            <Route path="mypage">
              <Route index element={<MyPage />} />
              <Route path="order/:id" element={<MyPageOrderPage />} />
              <Route path="order" element={<MyPageOrderPagee />} />
              <Route path="report/list" element={<MyPageReportListPage />} />
              <Route path="reportpage" element={<MypageReportPage />} />
              <Route
                path="reportdetail/:id"
                element={<MypageReportDetailPage />}
              />
              <Route path="orderclose">
                <Route index element={<MyPageOrderClosePage />} />
                <Route path=":id" element={<MyPageOrderCloseDetail />} />
              </Route>
              <Route path="review" element={<MyPageReviewPage />} />
              <Route path="address" element={<MyPageAddress />} />
              <Route path="withdrawal" element={<MypageUserWithdrawal />} />
              <Route path="coupon" element={<MyPageCouponPage />} />
              <Route path="favorite" element={<MyPageFavoriteListPage />} />
            </Route>
          </Route>

          {/* 사업자 */}
          <Route path="/ceopage" element={<CeoLayout />}>
            <Route index element={<CeoPage />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginPageforCEO />} />
            <Route path="orders-accepted" element={<OrdersAccepted />} />
            <Route path="orders-history" element={<OrdersHistory />} />
            <Route
              path="orders/details/:doneOrderPk"
              element={<OrdersDetail />}
            />
            <Route path="reviews" element={<Reviews />} />
            <Route path="store-management" element={<StoreManagement />} />
            <Route path="menu-management" element={<MenuManagement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="statisticsforCeo" element={<StatisticsforCeo />} />

            <Route path="withdraw" element={<CeoWithdrawal />} />
            <Route path="logins" element={<LoginPageforCEO />} />
          </Route>

          {/* 관리자 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Accept />} />
            <Route path="category-setting" element={<CategorySetting />} />
            <Route path="statistics" element={<StatisticsforAdmin />} />

            <Route path="ask">
              <Route index element={<Ask />} />
              <Route path="details/:id" element={<AskDetail />} />
            </Route>
            <Route path="report">
              <Route index element={<Report />} />
              <Route path="details/:report_pk" element={<ReportDetail />} />
            </Route>
            <Route path="accept">
              <Route index element={<Accept />} />
              <Route path="details/:resPk" element={<AcceptDetail />} />
            </Route>
          </Route>

          {/* 공통 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/intro" element={<IntroPage />} />
        </Routes>
      </div>
    </OrderProvider>
  );
}

export default App;
