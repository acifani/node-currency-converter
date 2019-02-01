workflow "New workflow" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "ci"
}

action "Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install"]
  args = "test"
}
