library(readr)
library(dplyr)
library(tidyr)
library(hydroTSM)


# This is a script to create summary distribution tables of all the DC Crime Incidents
# Then copy those tables into an Excel Workbook that will be used for the Google API Visualizations

dc_crime_clean <- read_csv("Data/dc_crime_clean.csv")
#dc_crime_clean$Season <- time2season(as.Date(dc_crime_clean$REPORT_TIME, format = "%m/%d/%Y"), 
#                                     out.fmt = "seasons", type="default")
#write.csv(dc_crime_clean, file = "dc_crime_clean.csv")

colnames(dc_crime_clean)[2] <- "REPORT_TIME"

# Create table of counts by year and offense type
offenses <- dc_crime_clean %>%
            group_by(OFFENSE, Year) %>%
            summarise(count=n())

offenses <- spread(offenses, Year, count)
offenses$Annual_Avg_10to19 <- rowMeans(offenses[,c(2,3,4,5,6,7,8,9,10,11)])
write.table(offenses, "clipboard", sep="\t", row.names=FALSE, col.names=TRUE)

# Create table of counts by year and method type
crime_methods <- dc_crime_clean %>%
                 group_by(METHOD, Year) %>%
                 summarise(count=n())

crime_methods <- spread(crime_methods, Year, count)
crime_methods$Annual_Avg_10to19 <- rowMeans(crime_methods[,c(2,3,4,5,6,7,8,9,10,11)])
write.table(crime_methods, "clipboard", sep="\t", row.names=FALSE, col.names=TRUE)

# Create table of counts by year and method type
crime_details <- dc_crime_clean %>%
                 group_by(OFFENSE, METHOD, Year) %>%
                 summarise(count=n())

crime_details <- spread(crime_details, Year, count) 
crime_details[is.na(crime_details)] <- 0
crime_details$Annual_Avg_10to19 <- rowMeans(crime_details[,c(3,4,5,6,7,8,9,10,11,12)])
write.table(crime_details, "clipboard", sep="\t", row.names=FALSE, col.names=TRUE)


# Create table of counts by year and DC neighborhood cluster
neighborhood_crimes <- dc_crime_clean %>%
                       group_by(DISTRICT, Year) %>%
                       summarise(count=n())

neighborhood_crimes <- spread(neighborhood_crimes, Year, count)
write.table(neighborhood_crimes, "clipboard", sep="\t", row.names=FALSE, col.names=TRUE)

# Create table of counts by year and season type
seasonal_crime <- dc_crime_clean %>%
                  group_by(Season, Year) %>%
                  summarise(count=n())

seasonal_crime <- spread(seasonal_crime, Year, count)
seasonal_crime$Annual_Avg_10to19 <- rowMeans(seasonal_crime[,c(2,3,4,5,6,7,8,9,10,11)])
write.table(seasonal_crime, "clipboard", sep="\t", row.names=FALSE, col.names=TRUE)
