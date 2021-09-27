# dehub-lottery-scheduler
DeHub lottery operator scheduler.

### Configuration
- `StandardLottery.Address`: Contract address of StandardLottery
- `SpecialLottery.Address`: Contract address of SpecialLottery
- `Rewards`: Rewards tiers breakdown percentages
- `Ticket.Price`: price rate per $Dehub

> Configuration can be overwritten by editing [config.ts](config.ts) file.

### Deployment

Operator private key can be overwritten by editign .env
```shell
$ yarn execute:[kind]-[command]:[network]
```

Script can be executed by crond service

#### Commands for Standard Lottery

Execute standard lottery script by using crond service

DeGrand first stage will take place on:
- 1st ~ 25th every month(except February) every 6 hours
- 1th ~ 24th February every 6 hours

Burnning will take place on:
- last day of every month 23:59

```shell
# Close standard lottery
0 */6 1-25 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet
0 */6 1-24 2 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet

0 0 26 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet
0 0 25 2 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet

# Draw standard lottery
3 */6 1-25 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:standard-draw:mainnet
3 */6 1-24 2 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet

3 0 26 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet
3 0 25 2 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet

# Burn unclaimed winnings
59 23 28-31 * * [ `date -d +'1 day' +\%d` -eq 1 ] && cd ~/dehub-lottery-scheduler && yarn execute:standard-burn:mainnet

# Start standard lottery
6 */6 1-25 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:standard-start:mainnet
6 */6 1-24 2 * cd ~/dehub-lottery-scheduler && yarn execute:standard-close:mainnet
```

#### Commands for Special Lottery

Execute special lottery script by using crond service

DeGrand second stage will take place on:
- 26th, 27th every month(except February) 00:00 ~ 23:59
- 25th, 26th February 00:00 ~ 23:59

Picking winners in DeGrand second stage will take place on:
- 28th every month(except February) 00:00
- 27th February 00:00

```shell
# Close special lottery
0 0 28 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:special-close:mainnet
0 0 28 2 * cd ~/dehub-lottery-scheduler && yarn execute:special-close:mainnet

# Pick DeGrand winners
3 0 28 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:special-pick:mainnet
3 0 28 2 * cd ~/dehub-lottery-scheduler && yarn execute:special-pick:mainnet

# Start special lottery
3 0 26 1,3-12 * cd ~/dehub-lottery-scheduler && yarn execute:special-start:mainnet
3 0 25 2 * cd ~/dehub-lottery-scheduler && yarn execute:special-start:mainnet
```


### Logging
Logs will be generated at `logs/lottery-YYYY-MM-DD.log`.
