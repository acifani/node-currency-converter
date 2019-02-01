workflow "Testing workflow" {
  on = "push"
  resolves = ["Test"]
}

action "Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "test"
}
