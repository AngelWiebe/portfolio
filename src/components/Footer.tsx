import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const communityList = t("community", { returnObjects: true });
  const communityArray = Array.isArray(communityList) ? communityList : [];

  return (
    <Stack alignItems="center" flexDirection="row" spacing={2}>
      <Typography component="span">{t("community_involvement")}</Typography>
      <ul className="community-list">
        {communityArray.map((community, index) => (
          <li className="community-item" key={index}>
            {community}
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default Footer;
