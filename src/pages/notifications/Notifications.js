import { useEffect, useState, useContext } from "react";
import Main from "../../components/layout/Main";
import { getAll } from "../../API/NotificationsApi";
import ThemeContext from "../../shop/ThemeContext";
import { useTranslation } from 'react-i18next';


const Notifications = () => {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation();

  const [notifications, setNotfications] = useState([]);
  const [sortByDate, setSortByDate] = useState("");
  // Add force state to force rerender notifications
  // eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(true);

  const color = useContext(ThemeContext);

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    if (sortByDate === "newest") {
      setForceUpdate((f) => !f);
      setNotfications((n) =>
        n.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } else if (sortByDate === "oldest") {
      setForceUpdate((f) => !f);
      setNotfications((n) =>
        n.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse()
      );
    }
  }, [sortByDate, notifications]);

  const getNotifications = async () => {
    const allNotifications = await getAll();
    allNotifications.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setNotfications(allNotifications);
  };

  const handleSelectedSort = (e) => {
    setSortByDate(e);
  };

  return (
    <Main>
      <div className="md:ml-8 lg:mr-20 mr-10 mt-8 notification">
        <div className="flex justify-between">
          <h2 className={`text-cyan-800 text-${color.themeColor} font-semibold`}>{t("yourNotification")}</h2>
          <div>
            <label className="font-semibold">{t("sortBy")}</label>
            <select
              className={`border bg-cyan-light bg-${color.themeColor}-light rounded-full p-2 mx-1 focus-visible:outline-none`}
              value={sortByDate}
              onChange={(event) => handleSelectedSort(event.target.value)}
            >
              <option disabled value="">
                {" "}
                {t("select")}
              </option>
              <option value="newest">{t("newNotification")}</option>
              <option value="oldest">{t("oldestNotification")}</option>
            </select>
          </div>
        </div>

        <ul>
          {notifications.length > 0 &&
            notifications.map((notification, index) => (
              <li
                key={index}
                className={`border border-cyan-md-light border-${color.themeColor}-md-light rounded-lg my-5 lg:w-3/4 p-4 bg-${color.themeColor}-card`}
              >
                <div className="text-md-xs font-semibold mb-3">
                  {notification.content}
                </div>
                <div className="text-md-xs font-normal text-gray-400">
                  {notification.date}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Main>
  );
};

export default Notifications;
